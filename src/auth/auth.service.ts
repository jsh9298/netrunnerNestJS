import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users/user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { changePass } from './dto/changePass.dto';
import { SaveFileService } from 'src/savefile/savefile.service';
import { FilesystemService } from 'src/filesystem/filesystem.service';
import { User } from './users/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private xmlservice: SaveFileService,
        private filesystemService: FilesystemService
    ) { }
    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        try {
            return await this.userRepository.createUser(authCredentialsDto);
        } catch (error) {
            console.error(error);
        }

    }
    async signin(signInDto: SignInDto): Promise<{ accessToken: string, missionId: number }> {
        const { userId, password } = signInDto;
        const user = await this.userRepository.findOne({ where: { userId } });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { userId };
            const accessToken = await this.jwtService.sign(payload);

            const mission = await this.xmlservice.readXml(userId, user.location);
            if (mission) {
                this.xmlservice.updateXml(userId, mission);
            }

            await this.filesystemService.initFs(userId, user.savepoint, user.location);
            const missionId = user.savepoint;
            return { accessToken, missionId };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }

    async changePass(changepass: changePass): Promise<void> {
        const { email, password } = changepass;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await this.userRepository.save(user);
    }
    async checkDuple(userId: string): Promise<boolean> {
        if (await this.userRepository.findOne({ where: { userId } }) === null) {
            return true;
        } else {
            return false;
        }
    }
    async getProfile(Id: string): Promise<{ userId: string, level: number, point: number }> {
        return this.userRepository.getProfile(Id);
    }
    async ranking() {
        const user_list = await this.userRepository.find({
            select: {
                userId: true,
                point: true,
                level: true
            }, order: {
                level: "DESC",
                userId: "ASC"
            }
        });
        return user_list;
    }
    async signOut(user: User) {
        const mission = await this.xmlservice.readXml(user.userId, user.location);
        this.xmlservice.saveXml(user.userId, user.location, mission);
        this.filesystemService.rmC(user.userId);
    }
}

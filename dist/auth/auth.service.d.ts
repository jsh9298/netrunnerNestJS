import { UserRepository } from './users/user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { changePass } from './dto/changePass.dto';
import { SaveFileService } from 'src/savefile/savefile.service';
import { FilesystemService } from 'src/filesystem/filesystem.service';
import { User } from './users/user.entity';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private xmlservice;
    private filesystemService;
    constructor(userRepository: UserRepository, jwtService: JwtService, xmlservice: SaveFileService, filesystemService: FilesystemService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signin(signInDto: SignInDto): Promise<{
        accessToken: string;
        missionId: number;
    }>;
    changePass(changepass: changePass): Promise<void>;
    checkDuple(userId: string): Promise<boolean>;
    getProfile(Id: string): Promise<{
        userId: string;
        level: number;
        point: number;
    }>;
    ranking(): Promise<User[]>;
    signOut(user: User): Promise<void>;
}

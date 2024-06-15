import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './users/user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { changePass } from './dto/changePass.dto';
import { User } from './users/user.entity';
import { Profile } from './dto/profile.dto';
import { Mission } from 'src/termsocket/filesystem/savefile.Dto';
import { XmlService } from 'src/termsocket/filesystem/savefile';

@Injectable()
export class AuthService {
    constructor(
        private userRepository:UserRepository,
        private jwtService:JwtService,
        private xmlservice:XmlService
    ){}
    async signUp(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        try {
            return await this.userRepository.createUser(authCredentialsDto);
        } catch (error) {
            console.error(error);
        }
        
    }
    async signin(signInDto:SignInDto):Promise<{accessToken:string}>{
        const {userId,password}=signInDto;
        const user = await this.userRepository.findOne({where:{userId}});
        
        if(user&&(await bcrypt.compare(password,user.password))){
            const payload = { userId };
            const accessToken = await this.jwtService.sign(payload);

            await this.xmlservice.readXml(userId);
            return {accessToken};
        }else{
            throw new UnauthorizedException('login failed');
        }
    }

    async changePass(changepass:changePass):Promise<void>{
        const {email,password} = changepass;
        const user = await this.userRepository.findOne({where:{email}});
        if (!user) {
            throw new Error('User not found');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        user.password = hashedPassword;
        await this.userRepository.save(user);
    }

    async getProfile(Id : string):Promise<{userId:string,level:number,point:number}>{
        return this.userRepository.getProfile(Id);
    }
    async ranking(){

    }
}

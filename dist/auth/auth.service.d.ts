import { UserRepository } from './users/user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { changePass } from './dto/changePass.dto';
import { Profile } from './dto/profile.dto';
import { XmlService } from 'src/termsocket/filesystem/savefile';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private xmlservice;
    constructor(userRepository: UserRepository, jwtService: JwtService, xmlservice: XmlService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signin(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
    changePass(changepass: changePass): Promise<void>;
    getProfile(userId: string): Promise<Profile>;
    ranking(): Promise<void>;
}

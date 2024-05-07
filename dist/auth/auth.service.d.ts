import { UserRepository } from './users/user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { changePass } from './dto/changePass.dto';
import { User } from './users/user.entity';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: UserRepository, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signin(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
    changePass(changepass: changePass): Promise<void>;
    getProfile(userId: string): Promise<User>;
    ranking(): Promise<void>;
}

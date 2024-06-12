import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { User } from './users/user.entity';
import { SignInDto } from './dto/signin.dto';
import { changePass } from './dto/changePass.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signIn(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
    changepass(changepass: changePass): Promise<void>;
    signout(user: User): void;
    getProfile(id: string): Promise<{
        userId: string;
        level: number;
        point: number;
    }>;
}

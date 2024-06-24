import { UserRepository } from './users/user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { changePass } from './dto/changePass.dto';
import { SaveFileService } from 'src/savefile/savefile.service';
import { FilesystemService } from 'src/filesystem/filesystem.service';
export declare class AuthService {
    private userRepository;
    private jwtService;
    private xmlservice;
    private filesystemService;
    constructor(userRepository: UserRepository, jwtService: JwtService, xmlservice: SaveFileService, filesystemService: FilesystemService);
    signUp(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    signin(signInDto: SignInDto): Promise<{
        accessToken: string;
    }>;
    changePass(changepass: changePass): Promise<void>;
    getProfile(Id: string): Promise<{
        userId: string;
        level: number;
        point: number;
    }>;
    ranking(): Promise<void>;
}

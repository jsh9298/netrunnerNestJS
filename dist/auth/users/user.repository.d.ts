import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "../dto/auth-credential.dto";
import { Profile } from "../dto/profile.dto";
export declare class UserRepository extends Repository<User> {
    createUser(authCredentialsDto: AuthCredentialsDto): Promise<void>;
    getProfile(userId: string): Promise<Profile>;
}

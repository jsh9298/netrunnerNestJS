import { UserRepository } from "src/auth/users/user.repository";
import { Mission } from "./savefile.Dto";
export declare class XmlService {
    private userRepository;
    constructor(userRepository: UserRepository);
    dto: Mission;
    readXml(userId: string): Promise<void>;
    getXml(): Mission;
}

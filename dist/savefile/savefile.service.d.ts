import { UserRepository } from "src/auth/users/user.repository";
import { Mission } from "./savefile.Dto";
export declare class SaveFileService {
    private userRepository;
    private dtoMap;
    constructor(userRepository: UserRepository);
    readXml(userId: string): Promise<Mission | null>;
    saveXml(userId: string, mission: Mission): Promise<void>;
    updateXml(userId: string, mission: Mission): void;
    getXml(userId: string): Mission | null;
}

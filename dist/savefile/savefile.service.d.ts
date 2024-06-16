import { UserRepository } from "src/auth/users/user.repository";
import { Mission } from "./savefile.Dto";
export declare class SaveFileService {
    private userRepository;
    private missions;
    constructor(userRepository: UserRepository, missions?: {
        [userId: string]: Mission;
    });
    readXml(userId: string): Promise<Mission | null>;
    saveXml(userId: string): Promise<void>;
    updateXml(userId: string, mission: Mission): void;
    getXml(userId: string): Mission | null;
}

import { UserRepository } from "src/auth/users/user.repository";
import { Mission } from './savefile.Dto';
export declare class SaveFileService {
    private userRepository;
    private _missionsCache;
    get missionsCache(): {
        [userId: string]: Mission;
    };
    set missionsCache(missions: {
        [userId: string]: Mission;
    });
    constructor(userRepository: UserRepository);
    getXml(userId: string): Promise<Mission>;
    readXml(userId: string): Promise<Mission>;
    saveXml(userId: string, mission: Mission): Promise<void>;
    updateXml(userId: string, mission: Mission): void;
}

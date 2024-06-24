import { Mission } from './savefile.Dto';
export declare class SaveFileService {
    private _missionsCache;
    get missionsCache(): {
        [userId: string]: Mission;
    };
    set missionsCache(missions: {
        [userId: string]: Mission;
    });
    getXml(userId: string, location: string): Promise<Mission>;
    readXml(userId: string, location: string): Promise<Mission>;
    saveXml(userId: string, location: string, mission: Mission): Promise<void>;
    updateXml(userId: string, mission: Mission): void;
}

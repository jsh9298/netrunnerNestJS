import { MissionsDTO } from './savefile.Dto';
export declare class SaveFileService {
    private _missionsCache;
    get missionsCache(): {
        [userId: string]: MissionsDTO;
    };
    set missionsCache(missions: {
        [userId: string]: MissionsDTO;
    });
    getXml(userId: string, location: string): Promise<MissionsDTO>;
    readXml(userId: string, location: string): Promise<MissionsDTO>;
    saveXml(userId: string, location: string, missions: MissionsDTO): Promise<void>;
    updateXml(userId: string, missions: MissionsDTO): void;
}

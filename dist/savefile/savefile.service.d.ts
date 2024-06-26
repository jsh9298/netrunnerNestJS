import { MissionDTO } from './savefile.Dto';
export declare class SaveFileService {
    private _missionsCache;
    get missionsCache(): {
        [userId: string]: MissionDTO[];
    };
    set missionsCache(missions: {
        [userId: string]: MissionDTO[];
    });
    getXml(userId: string, location: string): Promise<MissionDTO[]>;
    readXml(userId: string, location: string): Promise<MissionDTO[]>;
    saveXml(userId: string, location: string, missions: MissionDTO[]): Promise<void>;
    updateXml(userId: string, missions: MissionDTO[]): void;
}

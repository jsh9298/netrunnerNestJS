import { MissionsDTO } from "src/savefile/savefile.Dto";
import { FileSystem } from "./filesystemcore/fileSystems";
export declare class commends {
    fs: FileSystem;
    currentIP: string;
    currentUser: string;
    currentpath: string;
    userId: string;
    userLocation: string;
    missionsDTO: any;
    savepoint: number;
    isUserNode: boolean;
    nodelist: Map<string, number>;
    constructor(userId: string, missionsDTO: MissionsDTO, savepoint: number);
    setFs(dirlist: string[], filelist: string[], User: string, Ip: string): void;
    mkNodeList(): void;
    pwd(): string;
    cd(payload: any): "" | "No such path found";
    ls(payload: any): string;
    help(payload: any): string;
    cp(payload: any): string;
    mv(payload: any): string;
    rm(payload: any): string;
    mkdir(payload: any): string;
    rmdir(payload: any): string;
    cat(payload: any): string;
    vi(): void;
    checkMission(): any;
}

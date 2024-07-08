import { MissionsDTO } from "src/savefile/savefile.Dto";
import { SaveFileService } from "src/savefile/savefile.service";
import { FileSystem } from "./filesystemcore/fileSystems";
export declare class commends {
    private xmlService;
    fs: FileSystem;
    currentIP: string;
    userIP: string;
    currentUser: string;
    currentpath: string;
    userId: string;
    userLocation: string;
    missionsDTO: any;
    isUserNode: boolean;
    nodelist: Map<string, number>;
    currentNode: number;
    savepoint: number;
    constructor(xmlService: SaveFileService, userId: string, missionsDTO: MissionsDTO, savepoint: number);
    setFs(dirlist: string[], filelist: string[], uSer: string, Ip: string): Promise<void>;
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
    touch(payload: any): string;
    vi(payload: any): string;
    write(payload: any, context: any): Promise<string>;
    scan(payload: any): string;
    ssh(payload: any): string;
    exit(): string;
    calcSubnet(cidraddress: string, ipaddress: string): boolean;
    getKeyByValue(map: Map<string, number>, value: number): string | undefined;
    updateSave(save: number): void;
}

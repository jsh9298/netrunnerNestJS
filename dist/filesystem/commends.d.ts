import { FileSystem } from "./filesystemcore/fileSystems";
export declare class commends {
    fs: FileSystem;
    currentIP: string;
    currentUser: string;
    currentpath: string;
    setFs(fileSystem: FileSystem, dirlist: string[], filelist: string[], User: string, Ip: string): void;
    prompt(): string;
    pwd(): string;
    cd(payload: any): "" | "No such path found";
    ls(payload: any): string;
    help(payload: any): string;
    cp(payload: any): string;
    mv(payload: any): string;
    rm(payload: any): string;
    mkdir(payload: any): string;
    rmdir(payload: any): string;
}

export declare class commends {
    currentIP: any;
    currentFs: any;
    currentLocations: any;
    currentpath: any;
    constructor();
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

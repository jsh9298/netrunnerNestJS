import { SaveFileService } from 'src/savefile/savefile.service';
import { commends } from './commends';
import { User } from 'src/auth/users/user.entity';
export declare class FilesystemService {
    private saveFileService;
    private filesystemMap;
    private dirlist;
    private filelist;
    private currentUser;
    private currentip;
    private sf;
    private savepoint;
    constructor(saveFileService: SaveFileService);
    initFs(userId: string, savepoint: number, location: string): Promise<void>;
    rmC(userId: string): boolean;
    setC(userId: string): Promise<commends>;
    getC(userId: string): commends;
    getSys(user: User, id: number): Promise<{
        files: string[];
        filestype: string[];
        currentpath: string;
    }>;
}

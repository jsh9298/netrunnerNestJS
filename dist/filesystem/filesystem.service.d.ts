import { SaveFileService } from 'src/savefile/savefile.service';
import { commends } from './commends';
import { User } from 'src/auth/users/user.entity';
export declare class FilesystemService {
    private saveFileService;
    private filesystemMap;
    private fs;
    private dirlist;
    private filelist;
    private currentUser;
    private currentip;
    constructor(saveFileService: SaveFileService);
    initFs(userId: string, savepoint: number, location: string): Promise<void>;
    setFileSystem(userId: string): void;
    setC(userId: string): commends;
    getC(userId: string): commends;
    getSys(user: User, id: number): {
        files: string[];
        filestype: string[];
    };
}

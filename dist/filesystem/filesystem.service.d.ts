import { SaveFileService } from 'src/savefile/savefile.service';
import { commends } from './commends';
import { User } from 'src/auth/users/user.entity';
export declare class FilesystemService {
    private saveFileService;
    private c;
    constructor(saveFileService: SaveFileService, c: commends);
    initFs(userId: string, savepoint: number, location: string): Promise<void>;
    setFileSystem(id: string): void;
    getSys(user: User, id: number): {
        files: string[];
        filestype: string[];
    };
}

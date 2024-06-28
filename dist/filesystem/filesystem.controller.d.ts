import { FilesystemService } from './filesystem.service';
import { User } from 'src/auth/users/user.entity';
export declare class FilesystemController {
    private fileSystemService;
    constructor(fileSystemService: FilesystemService);
    getSys(user: User, id: number): Promise<{
        files: string[];
        filestype: string[];
    }>;
}

import { User } from 'src/auth/users/user.entity';
import { SaveFileService } from 'src/savefile/savefile.service';
export declare class MissionsService {
    private xmlService;
    constructor(xmlService: SaveFileService);
    getMissons(user: User, id: string): Promise<{
        missionID: number;
    }>;
}

import { User } from 'src/auth/users/user.entity';
import { SaveFileService } from 'src/savefile/savefile.service';
import { Mission } from 'src/savefile/savefile.Dto';
export declare class MissionsService {
    private xmlService;
    constructor(xmlService: SaveFileService);
    getMissons(user: User): Promise<Mission | {
        error: string;
    }>;
}

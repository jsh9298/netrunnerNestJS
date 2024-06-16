import { User } from 'src/auth/users/user.entity';
import { MissionsService } from './missions.service';
import { Mission } from 'src/savefile/savefile.Dto';
export declare class MissionsController {
    private missionsService;
    constructor(missionsService: MissionsService);
    getMisson(id: string, user: User): Promise<Mission>;
}

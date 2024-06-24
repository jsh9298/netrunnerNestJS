import { User } from 'src/auth/users/user.entity';
import { MissionsService } from './missions.service';
import { Mission } from 'src/savefile/savefile.Dto';
export declare class MissionsController {
    private missionsService;
    constructor(missionsService: MissionsService);
    getMisson(user: User): Promise<Mission | {
        error: string;
    }>;
    getPoints(id: string, user: User): number;
    getTools(): string;
}

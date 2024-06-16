import { User } from 'src/auth/users/user.entity';
import { MissionsService } from './missions.service';
export declare class MissionsController {
    private missionsService;
    constructor(missionsService: MissionsService);
    getMisson(id: string, user: User): Promise<{
        missionId: number;
    }>;
}

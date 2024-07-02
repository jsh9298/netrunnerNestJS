import { User } from 'src/auth/users/user.entity';
import { MissionsService } from './missions.service';
import { MissionDTO } from 'src/savefile/savefile.Dto';
export declare class MissionsController {
    private missionsService;
    constructor(missionsService: MissionsService);
    getMisson(id: number, user: User): Promise<MissionDTO>;
    getPoints(id: string, user: User): number;
    getTools(user: User): Promise<any[]>;
    checkIsclear(user: User, id: number): Promise<{
        success: boolean;
        nextMissionId: number;
    }>;
    buyTools(user: User, toolId: number): Promise<boolean>;
}

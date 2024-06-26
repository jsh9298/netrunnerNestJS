import { User } from 'src/auth/users/user.entity';
import { MissionsService } from './missions.service';
import { MissionDTO } from 'src/savefile/savefile.Dto';
import { Tool } from './tools/tool.entity';
export declare class MissionsController {
    private missionsService;
    constructor(missionsService: MissionsService);
    getMisson(id: number, user: User): Promise<MissionDTO>;
    getPoints(id: string, user: User): number;
    getTools(): Promise<Tool[]>;
    checkIsclear(user: User, id: string): void;
}

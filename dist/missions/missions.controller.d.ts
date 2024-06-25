import { User } from 'src/auth/users/user.entity';
import { MissionsService } from './missions.service';
import { Mission } from 'src/savefile/savefile.Dto';
import { Tool } from './tools/tool.entity';
export declare class MissionsController {
    private missionsService;
    constructor(missionsService: MissionsService);
    getMisson(user: User): Promise<Mission | {
        error: string;
    }>;
    getPoints(id: string, user: User): number;
    getTools(): Promise<Tool[]>;
    checkIsclear(user: User, id: string): void;
}

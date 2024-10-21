import { User } from 'src/auth/users/user.entity';
import { SaveFileService } from 'src/savefile/savefile.service';
import { MissionDTO } from 'src/savefile/savefile.Dto';
import { ToolsRepository } from './tools/tool.repository';
export declare class MissionsService {
    private xmlService;
    private toolsRepository;
    private attemptsCountMap;
    constructor(xmlService: SaveFileService, toolsRepository: ToolsRepository);
    getMissons(user: User): Promise<MissionDTO[]>;
    getTools(user: User): Promise<any[]>;
    setTool(): Promise<void>;
    checkClear(user: User, id: number): Promise<{
        success: boolean;
        nextMissionId: number;
    }>;
    buyTools(user: User, id: number): Promise<boolean>;
}

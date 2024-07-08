import { User } from 'src/auth/users/user.entity';
import { SaveFileService } from 'src/savefile/savefile.service';
import { MissionDTO } from 'src/savefile/savefile.Dto';
import { ToolsRepository } from './tools/tool.repository';
import { commends } from 'src/filesystem/commends';
export declare class MissionsService {
    private xmlService;
    private toolsRepository;
    private commend;
    constructor(xmlService: SaveFileService, toolsRepository: ToolsRepository, commend: commends);
    getMissons(user: User): Promise<MissionDTO[]>;
    getTools(user: User): Promise<any[]>;
    setTool(): Promise<void>;
    checkClear(user: User, id: number): Promise<{
        success: boolean;
        nextMissionId: number;
    }>;
    buyTools(user: User, id: number): Promise<boolean>;
}

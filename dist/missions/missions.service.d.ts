import { User } from 'src/auth/users/user.entity';
import { SaveFileService } from 'src/savefile/savefile.service';
import { MissionDTO } from 'src/savefile/savefile.Dto';
import { ToolsRepository } from './tools/tool.repository';
import { Tool } from './tools/tool.entity';
export declare class MissionsService {
    private xmlService;
    private toolsRepository;
    constructor(xmlService: SaveFileService, toolsRepository: ToolsRepository);
    getMissons(user: User): Promise<MissionDTO[]>;
    getTools(): Promise<Tool[]>;
    setTool(): Promise<void>;
}

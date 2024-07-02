import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { User } from 'src/auth/users/user.entity';
import { SaveFileService } from 'src/savefile/savefile.service';
import { MissionDTO } from 'src/savefile/savefile.Dto';
import { ToolsRepository } from './tools/tool.repository';
import { Tool } from './tools/tool.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesystemService } from 'src/filesystem/filesystem.service';
import { commends } from 'src/filesystem/commends';

// import { UserRepository } from 'src/auth/users/user.repository';

@Injectable()
export class MissionsService {

    constructor(
        private xmlService: SaveFileService,
        @InjectRepository(Tool)
        private toolsRepository: ToolsRepository,
        // private userRepository:UserRepository
    ) { }
    async getMissons(user: User): Promise<MissionDTO[]> {
        const mission = await this.xmlService.getXml(user.userId, user.location);
        return mission.mission;
    }
    async getTools(user: User) {
        try {
            const result = [];
            const tools = await this.toolsRepository.find();
            const usersTools = user.tool;
            for (let index = 0; index < tools.length; index++) {
                const { id, name, cost } = tools[index];
                const isBuy = usersTools.includes(name) ? true : false;
                const tool = { id, name, cost, isBuy };
                result.push(tool);
            }
            return result;
        } catch (error) {
            console.error(error);
        }
    }
    async setTool(): Promise<void> {
        const defaultTools: Partial<Tool>[] = [
            { name: 'notice', cost: 1 },
            { name: 'suggestion', cost: 1 },
            { name: 'free', cost: 1 },
            { name: 'knowledge', cost: 1 },
            { name: 'tips', cost: 1 },
            { name: 'review', cost: 1 },
            { name: 'qna', cost: 1 },
            { name: 'tech', cost: 1 },
            { name: 'career', cost: 1 },
            { name: 'recruitment', cost: 1 },
            { name: 'project', cost: 1 },
            { name: 'study', cost: 1 },
            { name: 'company', cost: 1 },
        ];
        for (let index = 0; index < defaultTools.length; index++) {
            const element = defaultTools[index];
            const tool = this.toolsRepository.create(element);
            await this.toolsRepository.save(tool);
        }
    }
    async checkClear(user: User, id: number): Promise<{ success: boolean, nextMissionId: number }> {
        const userfile = await this.xmlService.getXml(user.userId, user.location);
        let success: boolean = false;
        let nextMissionId: number = user.savepoint;
        for (let index = 0; index < userfile.userNode.userFile.length; index++) {
            if (userfile.mission[id].correctAnswer[0].myNode[0].nodeFile[0].File_name.toString().trim() == userfile.userNode.userFile[index].userFile_name.toString().trim()) {
                if (userfile.mission[id].correctAnswer[0].myNode[0].nodeFile[0].File_content.toString().replace(/\n|\r|\t/g, '').trim() == userfile.userNode.userFile[index].userFile_content.toString().replace(/\n|\r|\t/g, '').trim()) {
                    success = true;
                    break;
                } else {
                    success = false;
                    break;
                }
                // .toString().replace('/\\n|\\t|\\r/gm', '')
            }
        }
        if (success) {
            const rewardPoint: number = userfile.mission[id].reward[0].point;
            console.log(rewardPoint);
            this.xmlService.saveXml(user.userId, user.location, userfile);
            user.save({ data: user.savepoint++ });
            user.save({ data: user.point += rewardPoint });
            if (userfile.mission[id].reward.toolFile != '') {
                const rewardTool: string = userfile.mission[id].reward.toolFile;
                user.save({ data: user.tool + "," + rewardTool });
            }
            nextMissionId++;
        }
        return { success, nextMissionId };
    }

    async buyTools(user: User, id: number): Promise<boolean> {
        const tool = await this.toolsRepository.findOne({ where: { id } });
        if (user.point >= tool.cost) {
            user.save({ data: user.point -= tool.cost });
            user.save({ data: user.tool += tool.name + "," });
            return true;
        } else {
            return false;
        }
    }
}

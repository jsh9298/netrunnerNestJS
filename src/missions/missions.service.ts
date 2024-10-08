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
        private commend: commends
    ) { }
    async getMissons(user: User): Promise<MissionDTO[]> {
        const mission = await this.xmlService.getXml(user.userId, user.location, user.username);
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
            { name: 'porthack', cost: 25 },
            { name: 'SSHcrack', cost: 25 },
            { name: 'SMTPoverflow', cost: 25 },
            { name: 'WebServerWorm', cost: 25 },
            { name: 'Decypher', cost: 25 },
            { name: 'DECHead', cost: 25 },
            // { name: 'qna', cost: 1 },
            // { name: 'tech', cost: 1 },
            // { name: 'career', cost: 1 },
            // { name: 'recruitment', cost: 1 },
            // { name: 'project', cost: 1 },
            // { name: 'study', cost: 1 },
            // { name: 'company', cost: 1 },
        ];
        for (let index = 0; index < defaultTools.length; index++) {
            const element = defaultTools[index];
            const tool = this.toolsRepository.create(element);
            await this.toolsRepository.save(tool);
        }
    }
    async checkClear(user: User, id: number): Promise<{ success: boolean, nextMissionId: number }> {
        const userfile = await this.xmlService.getXml(user.userId, user.location, user.username);
        let success: boolean = false;
        let nextMissionId: number = user.savepoint;
        for (let index = 0; index < userfile.userNode.userFile.length; index++) {
            if (userfile.mission[id].correctAnswer[0].myNode[0].nodeFile[0].File_name.toString().trim() == userfile.userNode.userFile[index].userFile_name.toString().trim()) {
                console.log("userfile1", index, userfile.mission[id].correctAnswer[0].myNode[0].nodeFile[0].File_content.toString().replace(/\n|\r|\t|\s*/g, '').trim());
                console.log("userfile2", index, userfile.userNode.userFile[index].userFile_content.toString().replace(/\n|\r|\t|\s*/g, '').trim());
                if (userfile.mission[id].correctAnswer[0].myNode[0].nodeFile[0].File_content.toString().replace(/\n|\r|\t|\s*/g, '').trim() == userfile.userNode.userFile[index].userFile_content.toString().replace(/\n|\r|\t|\s*/g, '').trim()) {
                    success = true;
                    // this.commend.loggging_lock();
                    break;
                } else {
                    success = false;
                    break;
                }
                // .toString().replace('/\\n|\\t|\\r/gm', '')
            }
        }
        if (success) {
            const rewardPoint: number = parseInt(userfile.mission[id].reward[0].point[0]);
            const resultPoint: number = user.point + rewardPoint;
            this.xmlService.saveXml(user.userId, user.location, userfile);
            user.save({ data: user.savepoint++ });
            user.save({ data: user.point = resultPoint });
            if (userfile.mission[id].reward[0].toolFile[0] != '') {
                const rewardTool: string[] = userfile.mission[id].reward[0].toolFile[0].split(" ");
                console.log("reward:", rewardTool);
                const tools = rewardTool.join(",");
                user.save({ data: user.tool += tools + "," });
                console.log("save", tools);
                console.log("savecheck");
            }
            nextMissionId++;
        }
        return { success, nextMissionId };
    }

    async buyTools(user: User, id: number): Promise<boolean> {
        const tool = await this.toolsRepository.findOne({ where: { id } });
        if (user.point >= tool.cost) {
            const resultPoint: number = user.point - tool.cost;
            user.save({ data: user.point = resultPoint });
            user.save({ data: user.tool += tool.name + "," });
            return true;
        } else {
            return false;
        }
    }
}

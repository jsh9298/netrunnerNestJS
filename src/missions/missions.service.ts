import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { User } from 'src/auth/users/user.entity';
import { SaveFileService } from 'src/savefile/savefile.service';
import { MissionDTO } from 'src/savefile/savefile.Dto';
import { ToolsRepository } from './tools/tool.repository';
import { Tool } from './tools/tool.entity';
import { InjectRepository } from '@nestjs/typeorm';

// import { UserRepository } from 'src/auth/users/user.repository';

@Injectable()
export class MissionsService {
    private attemptsCountMap: Map<string, number> = new Map();
    constructor(
        private xmlService: SaveFileService,
        @InjectRepository(Tool)
        private toolsRepository: ToolsRepository,
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
            { name: 'DECHead', cost: 25 }
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

        const userId = user.userId; // 또는 사용자 식별자
        let attemptsCount = this.attemptsCountMap.get(userId) || 0; // 기본값 0 설정

        for (let index = 0; index < userfile.userNode.userFile.length; index++) {
            if (userfile.mission[id].correctAnswer[0].myNode[0].nodeFile[0].File_name.toString().trim() == userfile.userNode.userFile[index].userFile_name.toString().trim()) {
                console.log("userfile1", index, userfile.mission[id].correctAnswer[0].myNode[0].nodeFile[0].File_content.toString().replace(/\n|\r|\t|\s*/g, '').trim());
                console.log("userfile2", index, userfile.userNode.userFile[index].userFile_content.toString().replace(/\n|\r|\t|\s*/g, '').trim());
                if (userfile.mission[id].correctAnswer[0].myNode[0].nodeFile[0].File_content.toString().replace(/\n|\r|\t|\s*/g, '').trim() == userfile.userNode.userFile[index].userFile_content.toString().replace(/\n|\r|\t|\s*/g, '').trim()) {
                    success = true;
                    break;
                } else {
                    success = false;
                    attemptsCount++;
                    break;
                }
            }
        }

        this.attemptsCountMap.set(userId, attemptsCount); // 업데이트
        if (success) {
            const minusCount: number = this.attemptsCountMap.get(userId) || 0;
            const rewardPoint: number = parseInt(userfile.mission[id].reward[0].point[0]);
            const resultPoint: number = user.point + rewardPoint;
            const resultScore: number = Math.abs(resultPoint * (user.savepoint + 1) - minusCount);
            this.xmlService.saveXml(user.userId, user.location, userfile);
            user.save({ data: user.savepoint++ });
            user.save({ data: user.level++ });
            user.save({ data: user.point = resultPoint });
            user.save({ data: user.score += resultScore });
            if (userfile.mission[id].reward[0].toolFile[0] != '') {
                const rewardTool: string[] = userfile.mission[id].reward[0].toolFile[0].split(" ");
                console.log("reward:", rewardTool);
                const tools = rewardTool.join(",");
                user.save({ data: user.tool += tools + "," });
                console.log("save", tools);
                console.log("savecheck");
            }
            this.attemptsCountMap.delete(userId);
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

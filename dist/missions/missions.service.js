"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsService = void 0;
const common_1 = require("@nestjs/common");
const savefile_service_1 = require("../savefile/savefile.service");
const tool_repository_1 = require("./tools/tool.repository");
const tool_entity_1 = require("./tools/tool.entity");
const typeorm_1 = require("@nestjs/typeorm");
const commends_1 = require("../filesystem/commends");
let MissionsService = class MissionsService {
    constructor(xmlService, toolsRepository, commend) {
        this.xmlService = xmlService;
        this.toolsRepository = toolsRepository;
        this.commend = commend;
    }
    async getMissons(user) {
        const mission = await this.xmlService.getXml(user.userId, user.location, user.username);
        return mission.mission;
    }
    async getTools(user) {
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
        }
        catch (error) {
            console.error(error);
        }
    }
    async setTool() {
        const defaultTools = [
            { name: 'porthack', cost: 25 },
            { name: 'SSHcrack', cost: 25 },
            { name: 'SMTPoverflow', cost: 25 },
            { name: 'WebServerWorm', cost: 25 },
            { name: 'Decypher', cost: 25 },
            { name: 'DECHead', cost: 25 },
        ];
        for (let index = 0; index < defaultTools.length; index++) {
            const element = defaultTools[index];
            const tool = this.toolsRepository.create(element);
            await this.toolsRepository.save(tool);
        }
    }
    async checkClear(user, id) {
        const userfile = await this.xmlService.getXml(user.userId, user.location, user.username);
        let success = false;
        let nextMissionId = user.savepoint;
        for (let index = 0; index < userfile.userNode.userFile.length; index++) {
            if (userfile.mission[id].correctAnswer[0].myNode[0].nodeFile[0].File_name.toString().trim() == userfile.userNode.userFile[index].userFile_name.toString().trim()) {
                console.log("userfile1", index, userfile.mission[id].correctAnswer[0].myNode[0].nodeFile[0].File_content.toString().replace(/\n|\r|\t|\s*/g, '').trim());
                console.log("userfile2", index, userfile.userNode.userFile[index].userFile_content.toString().replace(/\n|\r|\t|\s*/g, '').trim());
                if (userfile.mission[id].correctAnswer[0].myNode[0].nodeFile[0].File_content.toString().replace(/\n|\r|\t|\s*/g, '').trim() == userfile.userNode.userFile[index].userFile_content.toString().replace(/\n|\r|\t|\s*/g, '').trim()) {
                    success = true;
                    break;
                }
                else {
                    success = false;
                    break;
                }
            }
        }
        if (success) {
            const rewardPoint = parseInt(userfile.mission[id].reward[0].point[0]);
            const resultPoint = user.point + rewardPoint;
            this.xmlService.saveXml(user.userId, user.location, userfile);
            user.save({ data: user.savepoint++ });
            user.save({ data: user.point = resultPoint });
            if (userfile.mission[id].reward[0].toolFile[0] != '') {
                const rewardTool = userfile.mission[id].reward[0].toolFile[0].split(" ");
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
    async buyTools(user, id) {
        const tool = await this.toolsRepository.findOne({ where: { id } });
        if (user.point >= tool.cost) {
            const resultPoint = user.point - tool.cost;
            user.save({ data: user.point = resultPoint });
            user.save({ data: user.tool += tool.name + "," });
            return true;
        }
        else {
            return false;
        }
    }
};
exports.MissionsService = MissionsService;
exports.MissionsService = MissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(tool_entity_1.Tool)),
    __metadata("design:paramtypes", [savefile_service_1.SaveFileService,
        tool_repository_1.ToolsRepository,
        commends_1.commends])
], MissionsService);
//# sourceMappingURL=missions.service.js.map
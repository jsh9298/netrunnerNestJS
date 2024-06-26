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
let MissionsService = class MissionsService {
    constructor(xmlService, toolsRepository) {
        this.xmlService = xmlService;
        this.toolsRepository = toolsRepository;
    }
    async getMissons(user) {
        console.log(user.userId);
        const mission = await this.xmlService.getXml(user.userId, user.location);
        return mission;
    }
    async getTools() {
        try {
            const result = await this.toolsRepository.find();
            return result;
        }
        catch (error) {
            console.error(error);
        }
    }
    async setTool() {
        console.log("call");
        const defaultTools = [
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
};
exports.MissionsService = MissionsService;
exports.MissionsService = MissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(tool_entity_1.Tool)),
    __metadata("design:paramtypes", [savefile_service_1.SaveFileService,
        tool_repository_1.ToolsRepository])
], MissionsService);
//# sourceMappingURL=missions.service.js.map
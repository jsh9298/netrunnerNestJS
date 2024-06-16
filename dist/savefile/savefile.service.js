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
exports.SaveFileService = void 0;
const fs = require("fs");
const path = require("path");
const user_repository_1 = require("../auth/users/user.repository");
const xml2js = require("xml2js");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../auth/users/user.entity");
let SaveFileService = class SaveFileService {
    get missionsCache() {
        return this._missionsCache;
    }
    set missionsCache(missions) {
        this._missionsCache = missions;
    }
    constructor(userRepository) {
        this.userRepository = userRepository;
        this._missionsCache = {};
    }
    async getXml(userId) {
        if (this.missionsCache[userId]) {
            return this.missionsCache[userId];
        }
        const mission = await this.readXml(userId);
        this.missionsCache[userId] = mission;
        return mission;
    }
    async readXml(userId) {
        try {
            const user = await this.userRepository.findOne({ where: { userId } });
            if (!user || !user.location) {
                return null;
            }
            const xmlFilePath = path.join(user.location, `${userId}sinario.xml`);
            const xmlData = await fs.promises.readFile(xmlFilePath, 'utf-8');
            const parser = new xml2js.Parser();
            return (await parser.parseStringPromise(xmlData));
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    async saveXml(userId, mission) {
        try {
            const user = await this.userRepository.findOne({ where: { userId } });
            if (!user || !user.location) {
                return;
            }
            const xmlFilePath = path.join(user.location, `${userId}sinario.xml`);
            const builder = new xml2js.Builder();
            const xmlData = builder.buildObject(mission);
            await fs.promises.writeFile(xmlFilePath, xmlData);
            this.missionsCache[userId] = mission;
        }
        catch (err) {
            console.error(err);
            return;
        }
    }
    updateXml(userId, mission) {
        this.missionsCache[userId] = mission;
    }
};
exports.SaveFileService = SaveFileService;
exports.SaveFileService = SaveFileService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], SaveFileService);
//# sourceMappingURL=savefile.service.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveFileService = void 0;
const fs = require("fs");
const path = require("path");
const user_repository_1 = require("../auth/users/user.repository");
const xml2js = require("xml2js");
const common_1 = require("@nestjs/common");
let SaveFileService = class SaveFileService {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.dtoMap = new Map();
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
            const dto = await parser.parseStringPromise(xmlData);
            this.dtoMap.set(userId, dto);
            return dto;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    async saveXml(userId, mission) {
        if (!this.dtoMap.has(userId)) {
            return;
        }
        try {
            const user = await this.userRepository.findOne({ where: { userId } });
            if (!user || !user.location) {
                return;
            }
            const xmlFilePath = path.join(user.location, `${userId}sinario.xml`);
            const builder = new xml2js.Builder();
            const xmlData = builder.buildObject(this.dtoMap.get(userId));
            await fs.promises.writeFile(xmlFilePath, xmlData);
        }
        catch (err) {
        }
    }
    updateXml(userId, mission) {
        this.dtoMap.set(userId, mission);
    }
    getXml(userId) {
        if (this.dtoMap.has(userId)) {
            return this.dtoMap.get(userId);
        }
        return null;
    }
};
exports.SaveFileService = SaveFileService;
exports.SaveFileService = SaveFileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], SaveFileService);
//# sourceMappingURL=savefile.service.js.map
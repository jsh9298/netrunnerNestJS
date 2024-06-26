"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveFileService = void 0;
const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
const savefile_Dto_1 = require("./savefile.Dto");
const common_1 = require("@nestjs/common");
let SaveFileService = class SaveFileService {
    constructor() {
        this._missionsCache = {};
    }
    get missionsCache() {
        return this._missionsCache;
    }
    set missionsCache(missions) {
        this._missionsCache = missions;
    }
    async getXml(userId, location) {
        if (this.missionsCache[userId]) {
            return this.missionsCache[userId];
        }
        const missions = await this.readXml(userId, location);
        this.missionsCache[userId] = missions;
        return missions;
    }
    async readXml(userId, location) {
        try {
            const xmlFilePath = path.join(location, `${userId}sinario.xml`);
            const xmlData = await fs.promises.readFile(xmlFilePath, 'utf-8');
            const parser = new xml2js.Parser();
            const missionData = await parser.parseStringPromise(xmlData);
            const missions = [];
            for (const missionItem of missionData.missions.mission) {
                const mission = new savefile_Dto_1.MissionDTO();
                Object.assign(mission, missionItem);
                missions.push(mission);
            }
            return missions;
        }
        catch (err) {
            console.error(err);
            return [];
        }
    }
    async saveXml(userId, location, missions) {
        try {
            const xmlFilePath = path.join(location, `${userId}sinario.xml`);
            const builder = new xml2js.Builder();
            const xmlData = builder.buildObject({ missions: { mission: missions } });
            await fs.promises.writeFile(xmlFilePath, xmlData);
            this.missionsCache[userId] = missions;
        }
        catch (err) {
            console.error(err);
            return;
        }
    }
    updateXml(userId, missions) {
        this.missionsCache[userId] = missions;
    }
};
exports.SaveFileService = SaveFileService;
exports.SaveFileService = SaveFileService = __decorate([
    (0, common_1.Injectable)()
], SaveFileService);
//# sourceMappingURL=savefile.service.js.map
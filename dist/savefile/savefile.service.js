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
const convert = require("xml-js");
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
    async getXml(userId, location, username) {
        const missions = await this.readXml(userId, location, username);
        this.missionsCache[userId] = missions;
        return missions;
    }
    async readXml(userId, location, username) {
        try {
            const xmlFilePath = path.join(location, `${userId}sinario.xml`);
            const xmlData = await fs.promises.readFile(xmlFilePath, 'utf-8');
            const parser = new xml2js.Parser();
            const missionData = await parser.parseStringPromise(xmlData);
            const missions = new savefile_Dto_1.MissionsDTO();
            const usernode = new savefile_Dto_1.UserNodeDTO();
            const mission = [];
            const name = username;
            for (const missionItem of missionData.missions.mission) {
                const mission2 = new savefile_Dto_1.MissionDTO();
                if (missionItem.scenario) {
                    console.log("Now Username : ", name);
                    const scenario = missionItem.scenario[0].story[0];
                    if (scenario.match(/(‘주인공’)|('주인공')/gm)) {
                        missionItem.scenario[0].story[0] = scenario.replace(/(‘주인공’)|('주인공')/gm, name);
                    }
                }
                Object.assign(mission2, missionItem);
                mission.push(mission2);
            }
            Object.assign(usernode, missionData.missions.userNode[0]);
            missions.mission = mission;
            missions.userNode = usernode;
            return missions;
        }
        catch (err) {
            console.error("TLqkf error roTLqkf", err);
            return;
        }
    }
    async saveXml(userId, location, missions) {
        try {
            const xmlFilePath = path.join(location, `${userId}sinario.xml`);
            const xmlData = convert.js2xml({ missions: missions }, {
                compact: true,
                indentAttributes: true,
                spaces: '\t',
                fullTagEmptyElement: true,
                ignoreAttributes: true
            });
            const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>\n';
            const finalXmlData = xmlDeclaration + xmlData;
            await fs.promises.writeFile(xmlFilePath, finalXmlData, { encoding: 'utf-8' });
            this.missionsCache[userId] = missions;
        }
        catch (err) {
            await this.saveErrorLog(err);
            return;
        }
    }
    async saveErrorLog(error) {
        try {
            const errorLogPath = path.join(__dirname, 'error.log');
            const errorLogEntry = `${new Date().toISOString()} - ${error.message}\n${error.stack}`;
            await fs.promises.appendFile(errorLogPath, errorLogEntry);
        }
        catch (logError) {
            console.error('Error saving error log:', logError);
        }
    }
    async updateXml(userId, missions) {
        this.missionsCache[userId] = missions;
        await this.saveXml(userId, `/game/${userId}`, missions);
    }
};
exports.SaveFileService = SaveFileService;
exports.SaveFileService = SaveFileService = __decorate([
    (0, common_1.Injectable)()
], SaveFileService);
//# sourceMappingURL=savefile.service.js.map
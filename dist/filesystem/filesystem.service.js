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
exports.FilesystemService = void 0;
const common_1 = require("@nestjs/common");
const savefile_service_1 = require("../savefile/savefile.service");
const commends_1 = require("./commends");
let FilesystemService = class FilesystemService {
    constructor(saveFileService) {
        this.saveFileService = saveFileService;
        this.filesystemMap = new Map();
        this.dirlist = [];
        this.filelist = [];
        this.currentUser = "";
        this.currentip = "";
        this.sf = null;
        this.savepoint = 0;
    }
    async initFs(userId, savepoint, location, username) {
        const sf = await this.saveFileService.getXml(userId, location, username);
        let dsl = [];
        for (let index = 0; index < sf.userNode.userDirectorys[0].userDirPath.length; index++) {
            dsl.push(sf.userNode.userDirectorys[0].userDirPath[index]);
        }
        this.dirlist = dsl;
        let fsl = [];
        for (let index = 0; index < sf.userNode.userFile.length; index++) {
            fsl.push(sf.userNode.userFile[index].userFile_name);
        }
        this.filelist = fsl;
        this.currentUser = "myNode";
        this.currentip = sf.userNode.userIP;
        this.sf = sf;
        this.savepoint = savepoint;
        this.setC(userId);
    }
    rmC(userId) {
        if (!this.filesystemMap.has(userId)) {
            return false;
        }
        this.filesystemMap.get(userId);
        this.filesystemMap.delete(userId);
        return true;
    }
    async setC(userId) {
        if (!this.filesystemMap.has(userId) && this.dirlist.length != 0) {
            const c = new commends_1.commends(this.saveFileService, userId, this.sf, this.savepoint);
            c.setFs(this.dirlist, this.filelist, this.currentUser, this.currentip);
            this.filesystemMap.set(userId, c);
        }
        return this.filesystemMap.get(userId);
    }
    getC(userId) {
        if (this.filesystemMap.has(userId)) {
            return this.filesystemMap.get(userId);
        }
    }
    async getSys(user, id) {
        await this.initFs(user.userId, id, `/game/${user.userId}`, user.username);
        let c = await this.setC(user.userId);
        const files = c.ls('ls').trim().split(' ');
        const typelist = c.ls(['ls', '-al']);
        const regex = /\[(directory|file)\]/g;
        const result = typelist.match(regex);
        const regex2 = /\[(.*?)\]/g;
        const filestype = result.map(item => item.replace(regex2, '$1'));
        const currentpath = c.pwd();
        return { files, filestype, currentpath };
    }
};
exports.FilesystemService = FilesystemService;
exports.FilesystemService = FilesystemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [savefile_service_1.SaveFileService])
], FilesystemService);
//# sourceMappingURL=filesystem.service.js.map
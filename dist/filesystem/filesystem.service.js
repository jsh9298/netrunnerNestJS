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
const fileSystems_1 = require("./filesystemcore/fileSystems");
let FilesystemService = class FilesystemService {
    constructor(saveFileService) {
        this.saveFileService = saveFileService;
        this.filesystemMap = new Map();
    }
    async initFs(userId, savepoint, location) {
        let sf = await this.saveFileService.getXml(userId, location);
    }
    setFileSystem(userId) {
        this.fs = new fileSystems_1.FileSystem();
        this.dirlist = ["/root", "/tmp", "/home/user", "/home/user/documents"];
        this.filelist = ["/home/user/documents/document1.txt", "/home/user/file1.txt", "/home/user/file2.txt"];
        this.currentUser = "/";
        this.currentip = "192.168.25.15";
        this.setC(userId);
    }
    setC(userId) {
        if (!this.filesystemMap.has(userId)) {
            const c = new commends_1.commends();
            c.setFs(this.fs, this.dirlist, this.filelist, this.currentUser, this.currentip);
            this.filesystemMap.set(userId, c);
        }
        return this.filesystemMap.get(userId);
    }
    getC(userId) {
        return this.filesystemMap.get(userId);
    }
    getSys(user, id) {
        this.setFileSystem(user.userId);
        const c = this.getC(user.userId);
        const files = c.ls('ls').trim().split(' ');
        const typelist = c.ls(['ls', '-al']);
        const regex = /\[(directory|file)\]/g;
        const result = typelist.match(regex);
        const regex2 = /\[(.*?)\]/g;
        const filestype = result.map(item => item.replace(regex2, '$1'));
        return { files, filestype };
    }
};
exports.FilesystemService = FilesystemService;
exports.FilesystemService = FilesystemService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [savefile_service_1.SaveFileService])
], FilesystemService);
//# sourceMappingURL=filesystem.service.js.map
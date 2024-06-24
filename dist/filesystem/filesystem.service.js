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
    constructor(saveFileService, c) {
        this.saveFileService = saveFileService;
        this.c = c;
    }
    async initFs(userId, savepoint, location) {
        let sf = await this.saveFileService.getXml(userId, location);
    }
    setFileSystem(id) {
        const fs = new fileSystems_1.FileSystem();
        const dirlist = ["/root", "/tmp", "/home/user", "/home/user/documents"];
        const filelist = ["/home/user/documents/document1.txt", "/home/user/file1.txt", "/home/user/file2.txt"];
        const currentUser = "/";
        const currentip = "192.168.25.15";
        const nc = new commends_1.commends();
        nc.setFs(fs, dirlist, filelist, currentUser, currentip);
        this.c = nc;
    }
    getSys(user, id) {
        this.setFileSystem(user.userId);
        const files = this.c.ls('ls').split(' ');
        const typelist = this.c.ls(['ls', '-al']);
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
    __metadata("design:paramtypes", [savefile_service_1.SaveFileService,
        commends_1.commends])
], FilesystemService);
//# sourceMappingURL=filesystem.service.js.map
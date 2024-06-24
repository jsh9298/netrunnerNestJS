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
exports.MissionsService = void 0;
const common_1 = require("@nestjs/common");
const savefile_service_1 = require("../savefile/savefile.service");
let MissionsService = class MissionsService {
    constructor(xmlService) {
        this.xmlService = xmlService;
    }
    async getMissons(user) {
        console.log(user.userId);
        const mission = await this.xmlService.getXml(user.userId, user.location);
        ;
        console.log(await this.xmlService.getXml(user.userId, user.location));
        console.log(mission);
        return mission;
    }
};
exports.MissionsService = MissionsService;
exports.MissionsService = MissionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [savefile_service_1.SaveFileService])
], MissionsService);
//# sourceMappingURL=missions.service.js.map
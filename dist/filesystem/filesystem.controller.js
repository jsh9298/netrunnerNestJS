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
exports.FilesystemController = void 0;
const common_1 = require("@nestjs/common");
const filesystem_service_1 = require("./filesystem.service");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const passport_1 = require("@nestjs/passport");
const user_entity_1 = require("../auth/users/user.entity");
let FilesystemController = class FilesystemController {
    constructor(fileSystemService) {
        this.fileSystemService = fileSystemService;
    }
    getSys(user, id) {
        return this.fileSystemService.getSys(user, id);
    }
};
exports.FilesystemController = FilesystemController;
__decorate([
    (0, common_1.Post)(":id"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", void 0)
], FilesystemController.prototype, "getSys", null);
exports.FilesystemController = FilesystemController = __decorate([
    (0, common_1.Controller)('filesystem'),
    __metadata("design:paramtypes", [filesystem_service_1.FilesystemService])
], FilesystemController);
//# sourceMappingURL=filesystem.controller.js.map
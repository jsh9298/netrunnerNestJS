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
exports.MissionsController = void 0;
const common_1 = require("@nestjs/common");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_entity_1 = require("../auth/users/user.entity");
const missions_service_1 = require("./missions.service");
const passport_1 = require("@nestjs/passport");
let MissionsController = class MissionsController {
    constructor(missionsService) {
        this.missionsService = missionsService;
    }
    async getMisson(id, user) {
        const result = await this.missionsService.getMissons(user);
        return result.at(id);
    }
    getPoints(id, user) {
        if (user.userId === id) {
            return user.point;
        }
    }
    async getTools(user) {
        return await this.missionsService.getTools(user);
    }
    checkIsclear(user, id) {
        return this.missionsService.checkClear(user, id);
    }
    buyTools(user, toolId) {
        return this.missionsService.buyTools(user, toolId);
    }
};
exports.MissionsController = MissionsController;
__decorate([
    (0, common_1.Post)("/:id"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MissionsController.prototype, "getMisson", null);
__decorate([
    (0, common_1.Post)("points/:userId"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_entity_1.User]),
    __metadata("design:returntype", void 0)
], MissionsController.prototype, "getPoints", null);
__decorate([
    (0, common_1.Get)("/tools"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", Promise)
], MissionsController.prototype, "getTools", null);
__decorate([
    (0, common_1.Post)("/complete/:id"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", Promise)
], MissionsController.prototype, "checkIsclear", null);
__decorate([
    (0, common_1.Post)("/tool/:toolId"),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt')),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Param)('toolId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User, Number]),
    __metadata("design:returntype", Promise)
], MissionsController.prototype, "buyTools", null);
exports.MissionsController = MissionsController = __decorate([
    (0, common_1.Controller)('missions'),
    __metadata("design:paramtypes", [missions_service_1.MissionsService])
], MissionsController);
//# sourceMappingURL=missions.controller.js.map
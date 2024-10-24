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
exports.GuisocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt = require("jsonwebtoken");
const config = require("config");
const filesystem_service_1 = require("../filesystem/filesystem.service");
const user_entity_1 = require("../auth/users/user.entity");
let GuisocketGateway = class GuisocketGateway {
    constructor(fileSystemService) {
        this.fileSystemService = fileSystemService;
        this.commandMap = new Map();
    }
    async handleConnection(client, ...args) {
        try {
            const token = client.handshake?.query?.token;
            const payload = jwt.verify(token, config.get('jwt.secret'));
            client.user = payload;
            console.log("cl gui id:", client.user.userId);
            const userId = client.user.userId;
            const user = await user_entity_1.User.findOne({ where: { userId } });
            this.fileSystemService.initFs(userId, user.savepoint, `/game/${userId}`, user.username);
            this.commandMap.set(client.id, await this.fileSystemService.setC(client.user.userId));
        }
        catch (error) {
            client.disconnect();
            console.error("gui Error:", error);
            return;
        }
    }
    handleJoin(client, data) {
        client.join(data.roomId);
        console.log("join gui:", data);
    }
    handleContent(client, data) {
        if (!client.user) {
            return;
        }
        const com = this.commandMap.get(client.id);
        const response = data.payload.split(' ');
        switch (response[0]) {
            case 'write':
                com.write(response, data.context.toString());
                break;
        }
    }
    handleMessage(client, data) {
        if (!client.user) {
            return;
        }
        const com = this.commandMap.get(client.id);
        const response = data.payload.split(' ');
        switch (response[0]) {
            case 'pwd':
                data.payload = com.pwd();
                break;
            case 'cd':
                data.payload = com.cd(response);
                break;
            case 'ls':
                data.payload = com.ls(response);
                break;
            case 'help':
                data.payload = com.help(response);
                break;
            case 'cp':
                data.payload = com.cp(response);
                break;
            case 'mv':
                data.payload = com.mv(response);
                break;
            case 'rm':
                data.payload = com.rm(response);
                break;
            case 'mkdir':
                data.payload = com.mkdir(response);
                break;
            case 'rmdir':
                data.payload = com.rmdir(response);
                break;
            case 'cat':
                data.payload = com.cat(response);
                break;
            case 'vi':
                data.payload = com.vi(response);
                break;
            case 'touch':
                data.payload = com.touch(response);
                break;
            case 'porthack':
                data.payload = com.porthack(response);
                break;
            case 'SSHcrack':
                data.payload = com.SSHcrack(response);
                break;
            case 'SMTPoverflow':
                data.payload = com.SMTPoverflow(response);
                break;
            case 'WebServerWorm':
                data.payload = com.WebServerWorm(response);
                break;
            case 'DECHead':
                data.payload = com.DECHead(response);
                break;
            case 'Decypher':
                data.payload = com.Decypher(response);
                break;
            default:
                data.payload = "Unkown command";
                break;
        }
        com.savepoint = parseInt(data.savepoint, 10);
        const payload = data.payload;
        this.server.to(data.roomId).emit('message', payload);
    }
    handleLeave(client, data) {
        console.log("leave gui:", data);
        client.leave(data.roomId);
    }
};
exports.GuisocketGateway = GuisocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GuisocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GuisocketGateway.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('content'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GuisocketGateway.prototype, "handleContent", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], GuisocketGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], GuisocketGateway.prototype, "handleLeave", null);
exports.GuisocketGateway = GuisocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: true, namespace: 'gui'
    }),
    __metadata("design:paramtypes", [filesystem_service_1.FilesystemService])
], GuisocketGateway);
//# sourceMappingURL=guisocket.gateway.js.map
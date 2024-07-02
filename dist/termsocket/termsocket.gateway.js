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
exports.TermsocketGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const jwt = require("jsonwebtoken");
const config = require("config");
const filesystem_service_1 = require("../filesystem/filesystem.service");
let TermsocketGateway = class TermsocketGateway {
    constructor(fileSystemService) {
        this.fileSystemService = fileSystemService;
        this.commandMap = new Map();
    }
    handleConnection(client, ...args) {
        try {
            const token = client.handshake?.query?.token;
            const payload = jwt.verify(token, config.get('jwt.secret'));
            client.user = payload;
            this.fileSystemService.initFs(client.user.userId, 0, `/game/${client.user.userId}`);
            this.commandMap.set(client.id, this.fileSystemService.setC(client.user.userId));
        }
        catch (error) {
            client.disconnect();
            console.error("term error:", error);
            return;
        }
    }
    handleJoin(client, data) {
        client.join(data.roomId);
        console.log("join:", data);
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
            case 'touch':
                data.payload = com.touch(response);
                break;
            case 'vi':
                data.payload = com.vi(response);
                break;
            default:
                data.payload = "Unkown commends";
                break;
        }
        this.server.to(data.roomId).emit('message', data.payload);
    }
    handleLeave(client, data) {
        console.log("leave:", data);
        client.leave(data.roomId);
    }
};
exports.TermsocketGateway = TermsocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TermsocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('join'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TermsocketGateway.prototype, "handleJoin", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], TermsocketGateway.prototype, "handleMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], TermsocketGateway.prototype, "handleLeave", null);
exports.TermsocketGateway = TermsocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: true, namespace: 'term'
    }),
    __metadata("design:paramtypes", [filesystem_service_1.FilesystemService])
], TermsocketGateway);
//# sourceMappingURL=termsocket.gateway.js.map
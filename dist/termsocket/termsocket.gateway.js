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
const commends_1 = require("./filesystem/commends");
let TermsocketGateway = class TermsocketGateway {
    constructor() {
        this.com = new commends_1.commends();
    }
    handleConnection(client, ...args) {
        try {
            const token = client.handshake?.query?.token;
            const payload = jwt.verify(token, config.get('jwt.secret'));
            client.user = payload;
        }
        catch (error) {
            client.disconnect();
            console.log("실패");
            return;
        }
    }
    handleMessage(client, payload) {
        if (!client.user) {
            return;
        }
        const response = payload.split(' ');
        console.log(response);
        switch (response[0]) {
            case 'pwd':
                payload = this.com.pwd();
                break;
            case 'cd':
                payload = this.com.cd(response);
                break;
            case 'ls':
                payload = this.com.ls(response);
                break;
            case 'help':
                payload = this.com.help(response);
                break;
            case 'cp':
                payload = this.com.cp(response);
                break;
            case 'mv':
                payload = this.com.mv(response);
                break;
            case 'rm':
                payload = this.com.rm(response);
                break;
            case 'mkdir':
                payload = this.com.mkdir(response);
                break;
            case 'rmdir':
                payload = this.com.rmdir(response);
                break;
            default:
                payload = "Unkown commends";
                break;
        }
        this.server.emit('message', payload);
    }
};
exports.TermsocketGateway = TermsocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], TermsocketGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('message'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", String)
], TermsocketGateway.prototype, "handleMessage", null);
exports.TermsocketGateway = TermsocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: true, namespace: 'term'
    }),
    __metadata("design:paramtypes", [])
], TermsocketGateway);
//# sourceMappingURL=termsocket.gateway.js.map
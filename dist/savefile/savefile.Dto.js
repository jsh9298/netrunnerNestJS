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
exports.Mission = void 0;
const class_validator_1 = require("class-validator");
class MissionType {
}
MissionType.SCANNING = 1;
MissionType.DETECTED_SPECIFIED_PORT = 2;
MissionType.EXECUTE_CODE = 3;
MissionType.PROXY_FIREWALL = 4;
MissionType.MONITORING = 5;
MissionType.CODE_INJECTION = 6;
MissionType.FILE_TRANSFER = 7;
class NodeProgram {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeProgram.prototype, "programName", void 0);
class TCPPort {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TCPPort.prototype, "servicePort", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TCPPort.prototype, "state", void 0);
class UDPPort {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UDPPort.prototype, "servicePort", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UDPPort.prototype, "state", void 0);
class Reward {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Reward.prototype, "point", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Reward.prototype, "toolFile", void 0);
class NodePort {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", TCPPort)
], NodePort.prototype, "tcp", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", UDPPort)
], NodePort.prototype, "udp", void 0);
class NodeFile {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeFile.prototype, "fileName", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeFile.prototype, "fileContent", void 0);
class Node {
}
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Node.prototype, "nodeId", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Node.prototype, "nodeMAC", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Node.prototype, "nodeIP", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", NodePort)
], Node.prototype, "nodePorts", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], Node.prototype, "nodeDirectories", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], Node.prototype, "nodePrograms", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    __metadata("design:type", Array)
], Node.prototype, "nodeFiles", void 0);
class MyNode {
}
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MyNode.prototype, "dirPath", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", NodeFile)
], MyNode.prototype, "nodeFile", void 0);
class CorrectAnswer {
}
__decorate([
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", MyNode)
], CorrectAnswer.prototype, "myNode", void 0);
class Mission {
}
exports.Mission = Mission;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Mission.prototype, "missionId", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], Mission.prototype, "scenario", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsEnum)(MissionType, { each: true }),
    __metadata("design:type", Array)
], Mission.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", CorrectAnswer)
], Mission.prototype, "correctAnswer", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Node)
], Mission.prototype, "node", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", Reward)
], Mission.prototype, "reward", void 0);
//# sourceMappingURL=savefile.Dto.js.map
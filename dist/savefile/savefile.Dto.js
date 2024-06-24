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
exports.Mission = exports.CorrectAnswer = exports.MyNode = exports.Node = exports.NodeFile = exports.NodePort = exports.UDPPort = exports.TCPPort = exports.Reward = exports.NodeProgram = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class NodeProgram {
}
exports.NodeProgram = NodeProgram;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeProgram.prototype, "programName", void 0);
class Reward {
}
exports.Reward = Reward;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Reward.prototype, "point", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], Reward.prototype, "toolFile", void 0);
class TCPPort {
}
exports.TCPPort = TCPPort;
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
exports.UDPPort = UDPPort;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UDPPort.prototype, "servicePort", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UDPPort.prototype, "state", void 0);
class NodePort {
}
exports.NodePort = NodePort;
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => TCPPort),
    __metadata("design:type", Array)
], NodePort.prototype, "tcp", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UDPPort),
    __metadata("design:type", Array)
], NodePort.prototype, "udp", void 0);
class NodeFile {
}
exports.NodeFile = NodeFile;
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
exports.Node = Node;
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
    (0, class_transformer_1.Type)(() => NodePort),
    __metadata("design:type", NodePort)
], Node.prototype, "nodePorts", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], Node.prototype, "nodeDirectories", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => NodeProgram),
    __metadata("design:type", Array)
], Node.prototype, "nodePrograms", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => NodeFile),
    __metadata("design:type", Array)
], Node.prototype, "nodeFiles", void 0);
class MyNode {
}
exports.MyNode = MyNode;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], MyNode.prototype, "dirPath", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => NodeFile),
    __metadata("design:type", Array)
], MyNode.prototype, "nodeFile", void 0);
class CorrectAnswer {
}
exports.CorrectAnswer = CorrectAnswer;
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => MyNode),
    __metadata("design:type", MyNode)
], CorrectAnswer.prototype, "myNode", void 0);
class Mission {
}
exports.Mission = Mission;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], Mission.prototype, "missionID", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)({ each: true }),
    __metadata("design:type", Array)
], Mission.prototype, "scenario", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    __metadata("design:type", Array)
], Mission.prototype, "type", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => CorrectAnswer),
    __metadata("design:type", CorrectAnswer)
], Mission.prototype, "correctAnswer", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Node),
    __metadata("design:type", Node)
], Mission.prototype, "node", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Reward),
    __metadata("design:type", Reward)
], Mission.prototype, "reward", void 0);
//# sourceMappingURL=savefile.Dto.js.map
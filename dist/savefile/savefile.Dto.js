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
exports.MissionsDTO = exports.UserNodeDTO = exports.MissionDTO = exports.CorrectAnswerDTO = exports.MyNodeDTO = exports.UserPortDTO = exports.UserDTO = exports.NodeDTO = exports.UserFileDTO = exports.NodeFileDTO = exports.RewardDTO = exports.NodeProgramDTO = exports.UserDirectorysDTO = exports.NodePortDTO = exports.TCPDTO = exports.ServiceDTO = exports.NodeDirectorysDTO = exports.UserProgramDTO = exports.UserServiceDTO = exports.FileContentDTO = void 0;
const class_validator_1 = require("class-validator");
class FileContentDTO {
}
exports.FileContentDTO = FileContentDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], FileContentDTO.prototype, "textData", void 0);
class UserServiceDTO {
}
exports.UserServiceDTO = UserServiceDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserServiceDTO.prototype, "userServiceName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], UserServiceDTO.prototype, "userServicePort", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserServiceDTO.prototype, "userPortState", void 0);
class UserProgramDTO {
}
exports.UserProgramDTO = UserProgramDTO;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UserProgramDTO.prototype, "userProgramName", void 0);
class NodeDirectorysDTO {
}
exports.NodeDirectorysDTO = NodeDirectorysDTO;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], NodeDirectorysDTO.prototype, "dirPath", void 0);
class ServiceDTO {
}
exports.ServiceDTO = ServiceDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServiceDTO.prototype, "serviceName", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], ServiceDTO.prototype, "servicePort", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ServiceDTO.prototype, "portState", void 0);
class TCPDTO {
}
exports.TCPDTO = TCPDTO;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], TCPDTO.prototype, "service", void 0);
class NodePortDTO {
}
exports.NodePortDTO = NodePortDTO;
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", TCPDTO)
], NodePortDTO.prototype, "TCP", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", TCPDTO)
], NodePortDTO.prototype, "UDP", void 0);
class UserDirectorysDTO {
}
exports.UserDirectorysDTO = UserDirectorysDTO;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UserDirectorysDTO.prototype, "userDirPath", void 0);
class NodeProgramDTO {
}
exports.NodeProgramDTO = NodeProgramDTO;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], NodeProgramDTO.prototype, "programName", void 0);
class RewardDTO {
}
exports.RewardDTO = RewardDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RewardDTO.prototype, "point", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RewardDTO.prototype, "toolFile", void 0);
class NodeFileDTO {
}
exports.NodeFileDTO = NodeFileDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeFileDTO.prototype, "File_name", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", FileContentDTO)
], NodeFileDTO.prototype, "File_content", void 0);
class UserFileDTO {
}
exports.UserFileDTO = UserFileDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserFileDTO.prototype, "userFile_name", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", FileContentDTO)
], UserFileDTO.prototype, "userFile_content", void 0);
class NodeDTO {
}
exports.NodeDTO = NodeDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeDTO.prototype, "nodeMAC", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NodeDTO.prototype, "nodeIP", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", NodePortDTO)
], NodeDTO.prototype, "nodePort", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", NodeDirectorysDTO)
], NodeDTO.prototype, "nodeDirectorys", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", NodeProgramDTO)
], NodeDTO.prototype, "nodeProgram", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], NodeDTO.prototype, "nodeFile", void 0);
class UserDTO {
}
exports.UserDTO = UserDTO;
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UserDTO.prototype, "userService", void 0);
class UserPortDTO {
}
exports.UserPortDTO = UserPortDTO;
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", UserDTO)
], UserPortDTO.prototype, "userTCP", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", UserDTO)
], UserPortDTO.prototype, "userUDP", void 0);
class MyNodeDTO {
}
exports.MyNodeDTO = MyNodeDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MyNodeDTO.prototype, "dirPath", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", NodeFileDTO)
], MyNodeDTO.prototype, "nodeFile", void 0);
class CorrectAnswerDTO {
}
exports.CorrectAnswerDTO = CorrectAnswerDTO;
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", MyNodeDTO)
], CorrectAnswerDTO.prototype, "myNode", void 0);
class MissionDTO {
}
exports.MissionDTO = MissionDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MissionDTO.prototype, "scenario", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", CorrectAnswerDTO)
], MissionDTO.prototype, "correctAnswer", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], MissionDTO.prototype, "node", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", RewardDTO)
], MissionDTO.prototype, "reward", void 0);
class UserNodeDTO {
}
exports.UserNodeDTO = UserNodeDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserNodeDTO.prototype, "userMAC", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserNodeDTO.prototype, "userIP", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", UserPortDTO)
], UserNodeDTO.prototype, "userPort", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", UserDirectorysDTO)
], UserNodeDTO.prototype, "userDirectorys", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], UserNodeDTO.prototype, "userFile", void 0);
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", UserProgramDTO)
], UserNodeDTO.prototype, "userProgram", void 0);
class MissionsDTO {
}
exports.MissionsDTO = MissionsDTO;
__decorate([
    (0, class_validator_1.IsObject)(),
    __metadata("design:type", UserNodeDTO)
], MissionsDTO.prototype, "userNode", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], MissionsDTO.prototype, "mission", void 0);
//# sourceMappingURL=savefile.Dto.js.map
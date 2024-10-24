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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./users/user.repository");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const savefile_service_1 = require("../savefile/savefile.service");
const filesystem_service_1 = require("../filesystem/filesystem.service");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, xmlservice, filesystemService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.xmlservice = xmlservice;
        this.filesystemService = filesystemService;
    }
    async signUp(authCredentialsDto) {
        try {
            return await this.userRepository.createUser(authCredentialsDto);
        }
        catch (error) {
            console.error(error);
        }
    }
    async signin(signInDto) {
        const { userId, password } = signInDto;
        const user = await this.userRepository.findOne({ where: { userId } });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { userId };
            const accessToken = await this.jwtService.sign(payload);
            const mission = await this.xmlservice.readXml(userId, user.location, user.username);
            if (mission) {
                this.xmlservice.updateXml(userId, mission);
            }
            await this.filesystemService.initFs(userId, user.savepoint, user.location, user.username);
            const missionId = user.savepoint;
            return { accessToken, missionId };
        }
        else {
            throw new common_1.UnauthorizedException('login failed');
        }
    }
    async changePass(changepass) {
        const { email, password } = changepass;
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new Error('User not found');
        }
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        await this.userRepository.save(user);
    }
    async checkDuple(userId) {
        if (await this.userRepository.findOne({ where: { userId } }) === null) {
            return true;
        }
        else {
            return false;
        }
    }
    async getProfile(Id) {
        return this.userRepository.getProfile(Id);
    }
    async ranking() {
        const user_list = await this.userRepository.find({
            select: {
                userId: true,
                point: true,
                score: true,
                level: true
            }, order: {
                score: "DESC",
                level: "DESC",
                point: "DESC",
                userId: "ASC"
            }
        });
        return user_list;
    }
    async signOut(user) {
        const mission = await this.xmlservice.readXml(user.userId, user.location, user.username);
        this.xmlservice.saveXml(user.userId, user.location, mission);
        this.filesystemService.rmC(user.userId);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        savefile_service_1.SaveFileService,
        filesystem_service_1.FilesystemService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
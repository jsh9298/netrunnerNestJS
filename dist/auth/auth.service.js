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
const savefile_1 = require("../termsocket/filesystem/savefile");
let AuthService = class AuthService {
    constructor(userRepository, jwtService, xmlservice) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.xmlservice = xmlservice;
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
            this.xmlservice.readXml(userId);
            return { accessToken };
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
    async getProfile(userId) {
        let profile;
        profile = await this.userRepository.findOne({ where: { userId } });
        return profile;
    }
    async ranking() {
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        savefile_1.XmlService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
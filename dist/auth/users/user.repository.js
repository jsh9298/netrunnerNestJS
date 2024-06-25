"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const typeorm_ex_decorator_1 = require("../../typeorm-ex/typeorm-ex.decorator");
const fs = require("fs");
const path = require("path");
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async createUser(authCredentialsDto) {
        const { userId, username, password, email } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const savepoint = 0;
        const location = `/game/${userId}`;
        const score = 0;
        const point = 0;
        const level = 0;
        const tool = "";
        const user = this.create({ userId, username, password: hashedPassword, email, savepoint, location, score, point, level, tool });
        try {
            let orginFilepath = "/game/origin/sinario.xml";
            const userDirectory = path.join("/game", userId);
            const originFile = path.basename(orginFilepath);
            const userFile = `${userId}${originFile}`;
            const destinationPath = path.join(userDirectory, userFile);
            if (!fs.existsSync(userDirectory)) {
                fs.mkdirSync(userDirectory, { recursive: true });
            }
            fs.copyFileSync(orginFilepath, destinationPath);
            await this.save(user);
        }
        catch (error) {
            console.error(error);
            throw new common_1.InternalServerErrorException();
        }
    }
    async getProfile(userId) {
        const { level, point } = await this.findOne({ where: { userId } });
        console.log(await this.findOne({ where: { userId } }));
        return { userId, level, point };
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, typeorm_ex_decorator_1.CustomRepository)(user_entity_1.User)
], UserRepository);
//# sourceMappingURL=user.repository.js.map
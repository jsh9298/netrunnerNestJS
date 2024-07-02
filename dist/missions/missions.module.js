"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissionsModule = void 0;
const common_1 = require("@nestjs/common");
const missions_controller_1 = require("./missions.controller");
const missions_service_1 = require("./missions.service");
const savefile_service_1 = require("../savefile/savefile.service");
const savefile_module_1 = require("../savefile/savefile.module");
const user_repository_1 = require("../auth/users/user.repository");
const auth_module_1 = require("../auth/auth.module");
const tool_repository_1 = require("./tools/tool.repository");
const typeorm_ex_module_1 = require("../typeorm-ex/typeorm-ex.module");
const tool_entity_1 = require("./tools/tool.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("../configs/typeorm.config");
const filesystem_service_1 = require("../filesystem/filesystem.service");
const commends_1 = require("../filesystem/commends");
let MissionsModule = class MissionsModule {
};
exports.MissionsModule = MissionsModule;
exports.MissionsModule = MissionsModule = __decorate([
    (0, common_1.Module)({
        imports: [savefile_module_1.SavefileModule, auth_module_1.AuthModule, typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeORMConfig), typeorm_1.TypeOrmModule.forFeature([tool_entity_1.Tool]), typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([tool_repository_1.ToolsRepository])],
        controllers: [missions_controller_1.MissionsController],
        providers: [missions_service_1.MissionsService, savefile_service_1.SaveFileService, user_repository_1.UserRepository, tool_repository_1.ToolsRepository, filesystem_service_1.FilesystemService, commends_1.commends],
        exports: [tool_repository_1.ToolsRepository, missions_service_1.MissionsService]
    })
], MissionsModule);
//# sourceMappingURL=missions.module.js.map
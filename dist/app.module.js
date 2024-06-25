"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_config_1 = require("./configs/typeorm.config");
const boards_module_1 = require("./boards/boards.module");
const email_service_1 = require("./email/email.service");
const email_module_1 = require("./email/email.module");
const termsocket_gateway_1 = require("./termsocket/termsocket.gateway");
const missions_module_1 = require("./missions/missions.module");
const savefile_module_1 = require("./savefile/savefile.module");
const filesystem_module_1 = require("./filesystem/filesystem.module");
const commends_1 = require("./filesystem/commends");
const filesystem_service_1 = require("./filesystem/filesystem.service");
const guisocket_gateway_1 = require("./guisocket/guisocket.gateway");
const missions_service_1 = require("./missions/missions.service");
const tool_repository_1 = require("./missions/tools/tool.repository");
const typeorm_ex_module_1 = require("./typeorm-ex/typeorm-ex.module");
const tool_entity_1 = require("./missions/tools/tool.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [auth_module_1.AuthModule, typeorm_1.TypeOrmModule.forRoot(typeorm_config_1.typeORMConfig), boards_module_1.BoardsModule, email_module_1.EmailModule, missions_module_1.MissionsModule, savefile_module_1.SavefileModule, filesystem_module_1.FilesystemModule, tool_repository_1.ToolsRepository, typeorm_1.TypeOrmModule.forFeature([tool_entity_1.Tool]), typeorm_ex_module_1.TypeOrmExModule.forCustomRepository([tool_repository_1.ToolsRepository])],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, email_service_1.EmailService, termsocket_gateway_1.TermsocketGateway, commends_1.commends, filesystem_service_1.FilesystemService, guisocket_gateway_1.GuisocketGateway, missions_service_1.MissionsService, tool_repository_1.ToolsRepository],
        exports: []
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SavefileModule = void 0;
const common_1 = require("@nestjs/common");
const savefile_service_1 = require("./savefile.service");
const user_repository_1 = require("../auth/users/user.repository");
const auth_module_1 = require("../auth/auth.module");
let SavefileModule = class SavefileModule {
};
exports.SavefileModule = SavefileModule;
exports.SavefileModule = SavefileModule = __decorate([
    (0, common_1.Module)({
        imports: [(0, common_1.forwardRef)(() => auth_module_1.AuthModule),
        ],
        providers: [savefile_service_1.SaveFileService, user_repository_1.UserRepository],
        exports: [savefile_service_1.SaveFileService]
    })
], SavefileModule);
//# sourceMappingURL=savefile.module.js.map
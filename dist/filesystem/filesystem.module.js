"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesystemModule = void 0;
const common_1 = require("@nestjs/common");
const filesystem_service_1 = require("./filesystem.service");
const savefile_service_1 = require("../savefile/savefile.service");
const savefile_module_1 = require("../savefile/savefile.module");
const filesystem_controller_1 = require("./filesystem.controller");
const commends_1 = require("./commends");
let FilesystemModule = class FilesystemModule {
};
exports.FilesystemModule = FilesystemModule;
exports.FilesystemModule = FilesystemModule = __decorate([
    (0, common_1.Module)({
        imports: [savefile_module_1.SavefileModule],
        providers: [filesystem_service_1.FilesystemService, savefile_service_1.SaveFileService, commends_1.commends],
        controllers: [filesystem_controller_1.FilesystemController]
    })
], FilesystemModule);
//# sourceMappingURL=filesystem.module.js.map
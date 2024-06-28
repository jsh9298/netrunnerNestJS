"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config = require("config");
const missions_service_1 = require("./missions/missions.service");
const fs = require("fs");
async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync('/etc/letsencrypt/live/netrunner.life/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/netrunner.life/fullchain.pem'),
    };
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { httpsOptions, });
    const serve = app.get(missions_service_1.MissionsService);
    await serve.setTool();
    app.enableCors();
    await app.listen(config.get('server'));
}
bootstrap();
//# sourceMappingURL=main.js.map
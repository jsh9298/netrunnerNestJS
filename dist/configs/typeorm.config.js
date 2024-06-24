"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeORMConfig = void 0;
const config = require("config");
const dbConfig = config.get('db');
exports.typeORMConfig = {
    type: dbConfig.type,
    host: dbConfig.host,
    port: dbConfig.port,
    username: dbConfig.username,
    password: dbConfig.password,
    database: dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: dbConfig.synchronize
};
//# sourceMappingURL=typeorm.config.js.map
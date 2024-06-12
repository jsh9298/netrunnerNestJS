"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XmlService = void 0;
const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
class XmlService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async readXml(userId) {
        try {
            const locate = (await this.userRepository.findOne({ where: { userId } })).location;
            const xmlFilePath = path.join(locate, `${userId}sinario.xml`);
            const xmlData = await fs.promises.readFile(xmlFilePath, 'utf-8');
            const parser = new xml2js.Parser();
            this.dto = await parser.parseStringPromise(xmlData);
        }
        catch (err) {
        }
    }
    getXml() {
        return this.dto;
    }
}
exports.XmlService = XmlService;
//# sourceMappingURL=savefile.js.map
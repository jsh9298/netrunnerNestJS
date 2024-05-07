"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const xml2js = require("xml2js");
class XmlService {
    constructor() {
        this.xmlFilePath = path.join(__dirname, 'user-info.xml');
    }
    async readAndModifyXml() {
        try {
            const xmlData = await fs.promises.readFile(this.xmlFilePath, 'utf-8');
            const parser = new xml2js.Parser();
            const builder = new xml2js.Builder();
            const result = await parser.parseStringPromise(xmlData);
            result.user.age[0] = '35';
            const updatedXml = builder.buildObject(result);
            await fs.promises.writeFile(this.xmlFilePath, updatedXml);
            console.log('XML 파일이 성공적으로 업데이트되었습니다.');
        }
        catch (error) {
            console.error('XML 파일 처리 중 오류 발생:', error);
        }
    }
}
const xmlService = new XmlService();
xmlService.readAndModifyXml();
//# sourceMappingURL=savefile.js.map
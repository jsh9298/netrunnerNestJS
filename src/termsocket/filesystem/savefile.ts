import { FileSystem } from "./fileSystems";
import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';


// const userXmlFilePath = path.join(userDirPath, 'user-info.xml');
// if (fs.existsSync(userXmlFilePath)) {
//   const xmlData = fs.readFileSync(userXmlFilePath, 'utf-8');
//   this.parseXml(xmlData);
// }
// private parseXml(xmlData: string): void {
//     parseString(xmlData, (err, result) => {
//       if (err) {
//         throw new Error('Failed to parse XML');
//       }
//       console.log(result); // 파싱된 XML 데이터 처리
//     });
// }


class XmlService {
  private xmlFilePath = path.join(__dirname, 'user-info.xml');

  async readAndModifyXml() {
    try {
      const xmlData = await fs.promises.readFile(this.xmlFilePath, 'utf-8');
      const parser = new xml2js.Parser();
      const builder = new xml2js.Builder();

      // XML 파일 파싱
      const result = await parser.parseStringPromise(xmlData);

      // 데이터 수정 예제: 사용자의 나이 변경
      result.user.age[0] = '35';

      // 수정된 객체를 XML로 재변환
      const updatedXml = builder.buildObject(result);

      // XML 파일 저장
      await fs.promises.writeFile(this.xmlFilePath, updatedXml);
      console.log('XML 파일이 성공적으로 업데이트되었습니다.');

    } catch (error) {
      console.error('XML 파일 처리 중 오류 발생:', error);
    }
  }
}

const xmlService = new XmlService();
xmlService.readAndModifyXml();

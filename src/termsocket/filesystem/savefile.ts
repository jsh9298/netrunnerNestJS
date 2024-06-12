import { FileSystem } from "./fileSystems";
import * as fs from 'fs';
import * as path from 'path';
import { UserRepository } from "src/auth/users/user.repository";
import * as xml2js from 'xml2js';
import { Mission } from "./savefile.Dto";


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


export class XmlService {
  constructor(
    private userRepository: UserRepository
  ){}
  dto:Mission;
  async readXml(userId:string) {
    try {
      const locate = (await this.userRepository.findOne({where:{userId}})).location;
      const xmlFilePath = path.join(locate,`${userId}sinario.xml`);
      const xmlData = await fs.promises.readFile(xmlFilePath, 'utf-8');
      const parser = new xml2js.Parser();
      // XML 파일 파싱
      this.dto = await parser.parseStringPromise(xmlData);
    }catch(err){

    }
  }
  getXml(){
    return this.dto;
  }
}

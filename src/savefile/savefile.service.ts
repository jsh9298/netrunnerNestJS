import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';
import { MissionsDTO, MissionDTO, UserNodeDTO } from './savefile.Dto';
import { Injectable } from "@nestjs/common";
import * as convert from 'xml-js';


@Injectable()
export class SaveFileService {
  private _missionsCache: { [userId: string]: MissionsDTO } = {};

  get missionsCache(): { [userId: string]: MissionsDTO } {
    return this._missionsCache;
  }

  set missionsCache(missions: { [userId: string]: MissionsDTO }) {
    this._missionsCache = missions;
  }

  async getXml(userId: string, location: string): Promise<MissionsDTO> {
    // if (this.missionsCache[userId]) {
    //   return this.missionsCache[userId];
    // } else {
    const missions = await this.readXml(userId, location);
    this.missionsCache[userId] = missions;
    return missions;
    // }
  }

  async readXml(userId: string, location: string): Promise<MissionsDTO> {
    try {
      const xmlFilePath = path.join(location, `${userId}sinario.xml`);
      const xmlData = await fs.promises.readFile(xmlFilePath, 'utf-8');
      const parser = new xml2js.Parser();
      const missionData = await parser.parseStringPromise(xmlData);
      const missions: MissionsDTO = new MissionsDTO();
      const usernode: UserNodeDTO = new UserNodeDTO();
      const mission: MissionDTO[] = [];
      for (const missionItem of missionData.missions.mission) {
        const mission2 = new MissionDTO();
        Object.assign(mission2, missionItem);
        mission.push(mission2);
      }
      Object.assign(usernode, missionData.missions.userNode[0]);
      missions.mission = mission;
      missions.userNode = usernode;
      return missions;
    } catch (err) {
      console.error(err);
      return;
    }
  }

  async saveXml(userId: string, location: string, missions: MissionsDTO): Promise<void> {
    try {
      const xmlFilePath = path.join(location, `${userId}sinario.xml`);
      const xmlData = convert.js2xml({ missions: missions }, {
        compact: true,
        indentAttributes: true,
        spaces: '\t',
        fullTagEmptyElement: true,
        ignoreAttributes: true
      });
      await fs.promises.writeFile(xmlFilePath, xmlData);
      this.missionsCache[userId] = missions;
    } catch (err) {
      await this.saveErrorLog(err);
      return;
    }
  }

  async saveErrorLog(error) {
    try {
      const errorLogPath = path.join(__dirname, 'error.log');
      const errorLogEntry = `${new Date().toISOString()} - ${error.message}\n${error.stack}`;
      await fs.promises.appendFile(errorLogPath, errorLogEntry);
    } catch (logError) {
      console.error('Error saving error log:', logError);
    }
  }
  async updateXml(userId: string, missions: MissionsDTO): Promise<void> {

    this.missionsCache[userId] = missions;
    await this.saveXml(userId, `/game/${userId}`, missions);
  }
}
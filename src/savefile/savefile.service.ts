import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';
import { MissionDTO } from './savefile.Dto';
import { Injectable } from "@nestjs/common";

@Injectable()
export class SaveFileService {
  private _missionsCache: { [userId: string]: MissionDTO[] } = {};

  get missionsCache(): { [userId: string]: MissionDTO[] } {
    return this._missionsCache;
  }

  set missionsCache(missions: { [userId: string]: MissionDTO[] }) {
    this._missionsCache = missions;
  }

  async getXml(userId: string, location: string): Promise<MissionDTO[]> {
    if (this.missionsCache[userId]) {
      return this.missionsCache[userId];
    }

    const missions = await this.readXml(userId, location);
    this.missionsCache[userId] = missions;
    return missions;
  }

  async readXml(userId: string, location: string): Promise<MissionDTO[]> {
    try {
      const xmlFilePath = path.join(location, `${userId}sinario.xml`);
      const xmlData = await fs.promises.readFile(xmlFilePath, 'utf-8');
      const parser = new xml2js.Parser();
      const missionData = await parser.parseStringPromise(xmlData);
      const missions: MissionDTO[] = [];

      // 각 미션 데이터를 MissionDTO 인스턴스로 변환
      for (const missionItem of missionData.missions.mission) {
        const mission = new MissionDTO();
        Object.assign(mission, missionItem);
        missions.push(mission);
      }

      return missions;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  async saveXml(userId: string, location: string, missions: MissionDTO[]): Promise<void> {
    try {
      const xmlFilePath = path.join(location, `${userId}sinario.xml`);
      const builder = new xml2js.Builder();
      const xmlData = builder.buildObject({ missions: { mission: missions } });
      await fs.promises.writeFile(xmlFilePath, xmlData);
      this.missionsCache[userId] = missions;
    } catch (err) {
      console.error(err);
      return;
    }
  }

  updateXml(userId: string, missions: MissionDTO[]): void {
    this.missionsCache[userId] = missions;
  }
}
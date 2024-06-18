import * as fs from 'fs';
import * as path from 'path';
import * as xml2js from 'xml2js';
import {Mission } from './savefile.Dto';
import { Injectable } from "@nestjs/common";

@Injectable()
export class SaveFileService {
  private _missionsCache: { [userId: string]: Mission } = {};

  get missionsCache(): { [userId: string]: Mission } {
    return this._missionsCache;
  }

  set missionsCache(missions: { [userId: string]: Mission  }) {
    this._missionsCache = missions;
  }

  async getXml(userId: string,location:string): Promise<Mission> {
    if (this.missionsCache[userId]) {
      return this.missionsCache[userId];
    }

    const mission = await this.readXml(userId,location);
    this.missionsCache[userId] = mission;
    return mission;
  }
  
  async readXml(userId: string,location:string): Promise<Mission> {
    try {
     
      const xmlFilePath = path.join(location, `${userId}sinario.xml`);
      const xmlData = await fs.promises.readFile(xmlFilePath, 'utf-8');
      const parser = new xml2js.Parser();
      const parsedXml = await parser.parseStringPromise(xmlData);
      const mission = new Mission();

      Object.assign(mission, parsedXml.mission);
      return mission;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async saveXml(userId: string,location:string, mission: Mission): Promise<void> {
    try {
     
      const xmlFilePath = path.join(location, `${userId}sinario.xml`);
      const builder = new xml2js.Builder();
      const xmlData = builder.buildObject(mission);
      await fs.promises.writeFile(xmlFilePath, xmlData);
      this.missionsCache[userId] = mission;
    } catch (err) {
      console.error(err);
      return;
    }
  }

  updateXml(userId: string, mission: Mission): void {
    this.missionsCache[userId] = mission;
  }
}

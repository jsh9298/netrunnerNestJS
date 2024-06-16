import * as fs from 'fs';
import * as path from 'path';

import { UserRepository } from "src/auth/users/user.repository";
import * as xml2js from 'xml2js';
import { Missions } from './savefile.Dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/users/user.entity';

@Injectable()
export class SaveFileService {
  private _missionsCache: { [userId: string]: Missions } = {};

  get missionsCache(): { [userId: string]: Missions } {
    return this._missionsCache;
  }

  set missionsCache(missions: { [userId: string]: Missions  }) {
    this._missionsCache = missions;
  }

  async getXml(userId: string,location:string): Promise<Missions> {
    if (this.missionsCache[userId]) {
      return this.missionsCache[userId];
    }

    const mission = await this.readXml(userId,location);
    this.missionsCache[userId] = mission;
    return mission;
  }

  async readXml(userId: string,location:string): Promise<Missions> {
    try {
     
      const xmlFilePath = path.join(location, `${userId}sinario.xml`);
      const xmlData = await fs.promises.readFile(xmlFilePath, 'utf-8');
      const parser = new xml2js.Parser();
      return (await parser.parseStringPromise(xmlData)) as Missions;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async saveXml(userId: string,location:string, mission: Missions): Promise<void> {
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

  updateXml(userId: string, mission: Missions): void {
    this.missionsCache[userId] = mission;
  }
}

import * as fs from 'fs';
import * as path from 'path';

import { UserRepository } from "src/auth/users/user.repository";
import * as xml2js from 'xml2js';
import { Mission } from './savefile.Dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/users/user.entity';

@Injectable()
export class SaveFileService {
  private _missionsCache: { [userId: string]: Mission } = {};

  get missionsCache(): { [userId: string]: Mission } {
    return this._missionsCache;
  }

  set missionsCache(missions: { [userId: string]: Mission }) {
    this._missionsCache = missions;
  }

  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async getXml(userId: string): Promise<Mission> {
    if (this.missionsCache[userId]) {
      return this.missionsCache[userId];
    }

    const mission = await this.readXml(userId);
    this.missionsCache[userId] = mission;
    return mission;
  }

  async readXml(userId: string): Promise<Mission> {
    try {
      const user = await this.userRepository.findOne({ where: { userId } });
      if (!user || !user.location) {
        return null;
      }
      const xmlFilePath = path.join(user.location, `${userId}sinario.xml`);
      const xmlData = await fs.promises.readFile(xmlFilePath, 'utf-8');
      const parser = new xml2js.Parser();
      return (await parser.parseStringPromise(xmlData)) as Mission;
    } catch (err) {
      console.error(err);
      return null;
    }
  }

  async saveXml(userId: string, mission: Mission): Promise<void> {
    try {
      const user = await this.userRepository.findOne({ where: { userId } });
      if (!user || !user.location) {
        return;
      }
      const xmlFilePath = path.join(user.location, `${userId}sinario.xml`);
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

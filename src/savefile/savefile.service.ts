import { FileSystem } from "../termsocket/filesystem/fileSystems";
import * as fs from 'fs';
import * as path from 'path';

import { UserRepository } from "src/auth/users/user.repository";
import * as xml2js from 'xml2js';
import { Mission } from "./savefile.Dto";
import { Injectable } from "@nestjs/common";

@Injectable()
export class SaveFileService {
  private dtoMap: Map<string, Mission> = new Map();

  constructor(
    private userRepository:UserRepository,
  ) {}

  async readXml(userId: string): Promise<Mission | null> {
    try {
      const user = await this.userRepository.findOne({where:{userId}});
      if (!user || !user.location) {
        return null;
      }

      const xmlFilePath = path.join(user.location, `${userId}sinario.xml`);
      const xmlData = await fs.promises.readFile(xmlFilePath, 'utf-8');
      const parser = new xml2js.Parser();
      const dto = await parser.parseStringPromise(xmlData) as Mission;
      this.dtoMap.set(userId, dto);
      return dto;
    } catch (err) {
      console.error(err);
      return null;
    }

  }
  async saveXml(userId:string,mission:Mission) : Promise<void>{
      if (!this.dtoMap.has(userId)) {
        return;
      }

      try {
        const user = await this.userRepository.findOne({ where: { userId } });
        if (!user || !user.location) {
          return;
        }

        const xmlFilePath = path.join(user.location, `${userId}sinario.xml`);
        const builder = new xml2js.Builder();
        const xmlData = builder.buildObject(this.dtoMap.get(userId)!);
        await fs.promises.writeFile(xmlFilePath, xmlData);
      } catch (err) {
      }

  }
  updateXml(userId: string, mission: Mission): void {
    this.dtoMap.set(userId, mission);
  }

  getXml(userId: string): Mission | null {
    if (this.dtoMap.has(userId)) {
      return this.dtoMap.get(userId);
    }
    return null;

  }
}

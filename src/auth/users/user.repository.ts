import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "../dto/auth-credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { CustomRepository } from "src/typeorm-ex/typeorm-ex.decorator";

import * as fs from 'fs';
import * as path from 'path';
import { Profile } from "../dto/profile.dto";

@CustomRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        const {userId,username,password,email}=authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        const savepoint = 0;
        const location =`/game/${userId}`;
        const score = 0;
        const point = 0;
        const level = 0;
        const user = this.create({userId,username,password:hashedPassword,email,savepoint,location,score,point,level});


        let orginFilepath = "/game/origin/sinario.xml";
        const userDirectory = path.join("/game",userId);
        const originFile = path.basename(orginFilepath);//orginFilepath
        const userFile = `${userId}${originFile}`;
        const destinationPath = path.join(userDirectory,userFile);
        try {
            await this.save(user);
            if(!fs.existsSync(userDirectory)){
                fs.mkdirSync(userDirectory,{recursive:true});
            }
            fs.copyFileSync(orginFilepath,destinationPath);
        } catch (error) {
            throw new InternalServerErrorException();
        }
    }
    async getProfile(userId:string):Promise<Profile>{
        const {level,point} = await this.findOne({where:{userId}});
        return {userId,level,point};
    }
}  
import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "../dto/auth-credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { CustomRepository } from "src/typeorm-ex/typeorm-ex.decorator";

import * as fs from 'fs';
import * as path from 'path';

@CustomRepository(User)
export class UserRepository extends Repository<User>{
    async createUser(authCredentialsDto:AuthCredentialsDto):Promise<void>{
        const {userId,username,password,email}=authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        const savepoint = 0;
        const location =`/game/${userId}`;
        const score =0;
        const point =0;
        const level =0;
        const user = this.create({userId,username,password:hashedPassword,email,savepoint,location,score,point,level});

        // let orginFilepath = "";
        // const userDirectory = path.join(__dirname,'users',userId);
        // const originFile = path.basename(orginFilepath);//orginFilepath
        // const userFile = `${userId}${originFile}`;
        // const destinationPath = path.join(userDirectory,userFile);
        try {
            await this.save(user);
            // if(!fs.existsSync(userDirectory)){
            //     fs.mkdirSync(userDirectory,{recursive:true});
            // }
            // fs.copyFileSync(orginFilepath,destinationPath);
        } catch (error) {
            if(error.code === '1062'){
                throw new ConflictException('Existing username');
            }else{
                throw new InternalServerErrorException();
            }
        }
    }
}  
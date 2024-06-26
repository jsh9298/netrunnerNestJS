import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { User } from 'src/auth/users/user.entity';
import { SaveFileService } from 'src/savefile/savefile.service';
import { MissionDTO } from 'src/savefile/savefile.Dto';
import { ToolsRepository } from './tools/tool.repository';
import { Tool } from './tools/tool.entity';
import { InjectRepository } from '@nestjs/typeorm';
// import { UserRepository } from 'src/auth/users/user.repository';

@Injectable()
export class MissionsService{
    constructor(
        private xmlService:SaveFileService,
        @InjectRepository(Tool)
        private toolsRepository:ToolsRepository,
        // private userRepository:UserRepository
    ){}
    async getMissons(user:User):Promise<MissionDTO[]>{
        console.log(user.userId);
        const mission=await this.xmlService.getXml(user.userId, user.location);
       return mission;
    }
    async getTools():Promise<Tool[]>{
        try {
            const result = await this.toolsRepository.find();
            return result;
        } catch (error) {
            console.error(error);
        }
    }
    async setTool():Promise<void>{
        console.log("call");
        const defaultTools: Partial<Tool>[] = [
            { name: 'notice',cost: 1 },
            { name: 'suggestion',cost: 1 },
            { name: 'free' ,cost: 1},
            { name: 'knowledge',cost: 1 },
            { name: 'tips' ,cost: 1},
            { name: 'review',cost: 1 },
            { name: 'qna',cost: 1 },
            { name: 'tech',cost: 1 },
            { name: 'career' ,cost: 1},
            { name: 'recruitment',cost: 1 },
            { name: 'project',cost: 1 },
            { name: 'study' ,cost: 1},
            { name: 'company',cost: 1 },
          ];
          for (let index = 0; index < defaultTools.length; index++) {
            const element = defaultTools[index];
            const tool = this.toolsRepository.create(element);
            await this.toolsRepository.save(tool);
          }
    }
    async checkClear(user:User,id:number):Promise<boolean>{
        const userfile = await this.xmlService.getXml(user.userId,user.location);
        let result:boolean = true;

        if(userfile[id].type.length>1){

        }else{
            switch(userfile[id].type[0]){
                case 1:
                    break;
                case 2:
                    break;
                default:
                    break;
            }
        }
        if(result){
            this.xmlService.saveXml(user.userId,user.location,userfile);
            user.save({data:user.savepoint++});
        }
        return result;
    }
}

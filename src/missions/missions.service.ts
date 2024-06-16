import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/users/user.entity';
import { SaveFileService } from 'src/savefile/savefile.service';
import { Missions } from 'src/savefile/savefile.Dto';

@Injectable()
export class MissionsService {
    constructor(
        private xmlService:SaveFileService
    ){}
    async getMissons(user:User,id:string):Promise<Missions|{error:string}>{
        console.log(user.userId);
        const missionId = await this.xmlService.getXml(user.userId,user.location)[id];
        if(!missionId){
            const error:string = "wrong accese";
            return {error};
        }
        console.log(missionId);
       return missionId;
    }
}

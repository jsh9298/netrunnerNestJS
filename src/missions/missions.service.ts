import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/users/user.entity';
import { SaveFileService } from 'src/savefile/savefile.service';
import { Mission } from 'src/savefile/savefile.Dto';

@Injectable()
export class MissionsService {
    constructor(
        private xmlService:SaveFileService
    ){}
    async getMissons(user:User,id:string):Promise<Mission>{
        console.log(user.userId);
        const missionId = await this.xmlService.getXml(user.userId);
        console.log(missionId);
       return missionId;
    }
}

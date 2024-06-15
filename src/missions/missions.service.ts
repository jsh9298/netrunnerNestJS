import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/users/user.entity';
import { SaveFileService } from 'src/savefile/savefile.service';
import { Mission } from 'src/savefile/savefile.Dto';

@Injectable()
export class MissionsService {
    constructor(
        private xmlService:SaveFileService
    ){}
    async getMissons(user:User,id:string):Promise<{missionID:number}>{
        const missionID:number = await this.xmlService.getXml(user.userId).missionID;
        return {missionID};
    }
}

import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/users/user.entity';
import { SaveFileService } from 'src/savefile/savefile.service';
import { MissionDTO } from 'src/savefile/savefile.Dto';

@Injectable()
export class MissionsService {
    constructor(
        private xmlService:SaveFileService
    ){}
    async getMissons(user:User):Promise<MissionDTO[]>{
        console.log(user.userId);
        const mission=await this.xmlService.getXml(user.userId, user.location);
       return mission;
    }
}

import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/users/user.entity';
import { SaveFileService } from 'src/savefile/savefile.service';
import { Mission } from 'src/savefile/savefile.Dto';

@Injectable()
export class MissionsService {
    constructor(
        private xmlService:SaveFileService
    ){}
    async getMissons(user:User):Promise<Mission|{error:string}>{
        console.log(user.userId);
        const mission:Mission=await this.xmlService.getXml(user.userId, user.location);;
        // const mission = await this.xmlService.getXml(user.userId, user.location);
        console.log(await this.xmlService.getXml(user.userId, user.location));
        console.log(mission);
       return mission;
    }
}

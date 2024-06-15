import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/users/user.entity';
import { XmlService } from 'src/termsocket/filesystem/savefile';
import { Mission } from 'src/termsocket/filesystem/savefile.Dto';

@Injectable()
export class MissionsService {
    constructor(
        private xmlService:XmlService
    ){}
    async getMissons(user:User,id:string):Promise<Mission>{
        return this.xmlService.getXml(user.userId);
    }
}

import { Injectable } from '@nestjs/common';
import { SaveFileService } from 'src/savefile/savefile.service';
import { Mission } from 'src/savefile/savefile.Dto';
import { commends } from './commends';
import { FileSystem } from './filesystemcore/fileSystems';
import { User } from 'src/auth/users/user.entity';

@Injectable()
export class FilesystemService {
    constructor(
        private saveFileService:SaveFileService,
        private c:commends,
    ){}
    async initFs(userId:string,savepoint:number,location:string){
         let sf = await this.saveFileService.getXml(userId,location);
    }
    setFileSystem(){
        const fs = new FileSystem();
        const dirlist = ["/root","/tmp","/home/user","/home/user/documents"];
        const filelist = ["/home/user/documents/document1.txt","/home/user/file1.txt","/home/user/file2.txt"];
        const currentUser = "/";
        const currentip = "192.168.25.15";
        this.c.setFs(fs,dirlist,filelist,currentUser,currentip);
    }
    setC(){
        this.setFileSystem();
        return this.c;
    }
    getSys(user:User,id:number){
        this.setFileSystem();
        const files = this.c.ls('ls').split(' ');
        const typelist = this.c.ls(['ls','-al']);
        const regex = /\[(directory|file)\]/g;
        const result =  typelist.match(regex);
        const regex2 = /\[(.*?)\]/g;
        const filestype = result.map(item => item.replace(regex2, '$1'));

        return {files,filestype};
    }
}

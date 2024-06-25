import { Injectable } from '@nestjs/common';
import { SaveFileService } from 'src/savefile/savefile.service';
import { commends } from './commends';
import { FileSystem } from './filesystemcore/fileSystems';
import { User } from 'src/auth/users/user.entity';

@Injectable()
export class FilesystemService {
    private filesystemMap: Map<string, commends> = new Map();
    private fs:FileSystem;
    private dirlist: string[];
    private filelist: string[];
    private currentUser: string;
    private currentip: string;
    constructor(
        private saveFileService:SaveFileService,
    ){}
    async initFs(userId:string,savepoint:number,location:string){
         let sf = await this.saveFileService.getXml(userId,location);
    }
    setFileSystem(userId:string){
        this.fs = new FileSystem();
        this.dirlist = ["/root","/tmp","/home/user","/home/user/documents"];
        this.filelist = ["/home/user/documents/document1.txt","/home/user/file1.txt","/home/user/file2.txt"];
        this.currentUser = "/";
        this.currentip = "192.168.25.15";
        this.setC(userId);
    }
    

    setC(userId: string):commends {
        if (!this.filesystemMap.has(userId)) {
            const c = new commends();
            c.setFs(this.fs,this.dirlist,this.filelist,this.currentUser,this.currentip);
            this.filesystemMap.set(userId, c);
        }
        return this.filesystemMap.get(userId);
    }

    getC(userId: string): commends {
        return this.filesystemMap.get(userId);
    }
    getSys(user:User,id:number){
        this.setFileSystem(user.userId);
        const c = this.getC(user.userId);

        const files = c.ls('ls').trim().split(' ');
        const typelist = c.ls(['ls','-al']);
        const regex = /\[(directory|file)\]/g;
        const result =  typelist.match(regex);
        const regex2 = /\[(.*?)\]/g;
        const filestype = result.map(item => item.replace(regex2, '$1'));

        return {files,filestype};
    }
}

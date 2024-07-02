import { Injectable } from '@nestjs/common';
import { SaveFileService } from 'src/savefile/savefile.service';
import { commends } from './commends';
import { FileSystem } from './filesystemcore/fileSystems';
import { User } from 'src/auth/users/user.entity';
import { MissionsDTO } from 'src/savefile/savefile.Dto';

@Injectable()
export class FilesystemService {
    private filesystemMap: Map<string, commends> = new Map();
    private dirlist: string[];
    private filelist: string[];
    private currentUser: string;
    private currentip: string;
    private sf: MissionsDTO;
    private savepoint: number;
    constructor(
        private saveFileService: SaveFileService,
    ) { }
    async initFs(userId: string, savepoint: number, location: string) {
        const sf = await this.saveFileService.getXml(userId, location);
        let dsl: string[] = [];
        for (let index = 0; index < sf.userNode.userDirectorys[0].userDirPath.length; index++) {
            dsl.push(sf.userNode.userDirectorys[0].userDirPath[index]);
        }
        this.dirlist = dsl;
        // this.dirlist = sf.userNode[0].userDirectorys;
        let fsl: string[] = [];

        for (let index = 0; index < sf.userNode.userFile.length; index++) {
            fsl.push(sf.userNode.userFile[index].userFile_name);
        }
        this.filelist = fsl;
        this.currentUser = "myNode";
        this.currentip = sf.userNode.userIP;
        this.sf = sf;
        this.savepoint = savepoint;
        this.setC(userId);
    }
    setFileSystem(userId: string) {
        this.dirlist = ["/root", "/tmp", "/home/user", "/home/user/documents"];
        this.filelist = ["/home/user/documents/document1.txt", "/home/user/file1.txt", "/home/user/file2.txt"];
        this.currentUser = "/";
        this.currentip = "192.168.25.15";
        // this.setC(userId);
    }

    rmC(userId: string): boolean {
        if (!this.filesystemMap.has(userId)) {
            return false;
        }
        this.filesystemMap.get(userId);

        this.filesystemMap.delete(userId);
        return true;
    }

    setC(userId: string): commends {
        if (!this.filesystemMap.has(userId)) {
            const c = new commends(this.saveFileService, userId, this.sf, this.savepoint);
            c.setFs(this.dirlist, this.filelist, this.currentUser, this.currentip);
            this.filesystemMap.set(userId, c);
        }
        return this.filesystemMap.get(userId);
    }

    getC(userId: string): commends {
        if (this.filesystemMap.has(userId)) {
            return this.filesystemMap.get(userId);
        }
    }
    async getSys(user: User, id: number) {
        await this.initFs(user.userId, id, `/game/${user.userId}`);
        let c = this.getC(user.userId);
        const files = c.ls('ls').trim().split(' ');
        const typelist = c.ls(['ls', '-al']);
        const regex = /\[(directory|file)\]/g;
        const result = typelist.match(regex);
        const regex2 = /\[(.*?)\]/g;
        const filestype = result.map(item => item.replace(regex2, '$1'));
        const currentpath = c.pwd();
        return { files, filestype, currentpath };
    }
}

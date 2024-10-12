import { Injectable } from '@nestjs/common';
import { SaveFileService } from 'src/savefile/savefile.service';
import { commends } from './commends';
import { FileSystem } from './filesystemcore/fileSystems';
import { User } from 'src/auth/users/user.entity';
import { MissionsDTO } from 'src/savefile/savefile.Dto';

@Injectable()
export class FilesystemService {
    private filesystemMap: Map<string, commends> = new Map();
    private dirlist: string[] = [];
    private filelist: string[] = [];
    private currentUser: string = "";
    private currentip: string = "";
    private sf: MissionsDTO = null;
    private savepoint: number = 0;
    constructor(
        private saveFileService: SaveFileService,
    ) { }
    async initFs(userId: string, savepoint: number, location: string, username: string) {
        const sf = await this.saveFileService.getXml(userId, location, username);
        let dsl: string[] = [];
        for (let index = 0; index < sf.userNode.userDirectorys[0].userDirPath.length; index++) {
            dsl.push(sf.userNode.userDirectorys[0].userDirPath[index]);
        }

        this.dirlist = dsl;
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

    rmC(userId: string): boolean {
        if (!this.filesystemMap.has(userId)) {
            return false;
        }
        this.filesystemMap.get(userId);

        this.filesystemMap.delete(userId);
        return true;
    }

    async setC(userId: string): Promise<commends> {
        if (!this.filesystemMap.has(userId) && this.dirlist.length != 0) {
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
        await this.initFs(user.userId, id, `/game/${user.userId}`, user.username);
        let c = await this.setC(user.userId);
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

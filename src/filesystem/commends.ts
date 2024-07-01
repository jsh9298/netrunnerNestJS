import { FileContentDTO, MissionsDTO, NodeFileDTO, UserFileDTO } from "src/savefile/savefile.Dto";
import { FileSystem } from "./filesystemcore/fileSystems";


export class commends {
    fs: FileSystem = new FileSystem();
    currentIP: string = "";
    currentUser: string = "";
    currentpath: string = "";
    userId: string = "";
    userLocation: string = "";
    missionsDTO = null;
    savepoint: number = 0;
    isUserNode: boolean = true;
    nodelist: Map<string, number> = new Map();
    constructor(userId: string, missionsDTO: MissionsDTO, savepoint: number) {
        this.userId = userId;
        this.userLocation = `/game/${userId}`
        this.missionsDTO = missionsDTO;
        this.savepoint = savepoint;
    }
    setFs(dirlist: string[], filelist: string[], User: string, Ip: string) {
        this.currentIP = Ip;
        this.currentUser = User;
        this.fs.createDirectory("/bin");
        this.fs.createDirectory("/boot");
        this.fs.createDirectory("/dev");
        this.fs.createDirectory("/etc");
        this.fs.createDirectory("/home");
        this.fs.createDirectory("/lib");
        this.fs.createDirectory("/media");
        this.fs.createDirectory("/mnt");
        this.fs.createDirectory("/opt");
        this.fs.createDirectory("/proc");
        this.fs.createDirectory("/root");
        this.fs.createDirectory("/run");
        this.fs.createDirectory("/sbin");
        this.fs.createDirectory("/srv");
        this.fs.createDirectory("/sys");
        this.fs.createDirectory("/tmp");
        this.fs.createDirectory("/usr");
        this.fs.createDirectory("/var");
        for (let index = 0; index < dirlist.length; index++) {
            this.fs.createDirectory(dirlist[index].toString());
        }
        for (let index = 0; index < filelist.length; index++) {
            this.fs.createFile(filelist[index].toString());
        }
        if (this.currentUser == 'root') {
            this.currentpath = '/root';
        } else if (this.currentUser === '/') {
            this.currentpath = '/';
        } else {
            this.currentpath = `/home/${this.currentUser}`;
        }
    }

    mkNodeList() {
        for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node.length; index++) {
            this.nodelist.set(this.missionsDTO.mission[this.savepoint].node[index].nodeIP, index);
        }
    }

    pwd() {
        return this.fs.getPathInfo(this.currentpath).absolutePath + "";
    }
    cd(payload) {
        if (payload[1] === undefined) {
            if (this.currentUser == 'root') {
                this.currentpath = '/root';
            } else if (this.currentUser === '/') {
                this.currentpath = '/';
            } else {
                this.currentpath = `/home/${this.currentUser}`;
            }
        } else if (payload[1] === '..') {
            if (this.currentpath == '/') {
                this.currentpath = '/';
            } else {
                let lastPath = this.currentpath.lastIndexOf("/");
                let temp = this.currentpath.substring(0, lastPath);
                this.currentpath = temp;
            }
        } else if (this.fs.isOverlap(payload[1], this.currentpath) == false) {
            if (this.currentpath === "/") {
                this.currentpath += ("" + payload[1]);
            } else {
                this.currentpath += ("/" + payload[1]);
            }
        } else if (this.fs.findDirectory(payload[1]) == true) {
            this.currentpath = payload[1];
        } else {
            return "No such path found";
        }
        return "";
    }
    ls(payload) {
        let result = '';
        for (const key in this.fs.getPathInfo(this.currentpath).files) {
            result += this.fs.getPathInfo(this.currentpath).files[key];
            if (payload[1] == "-al") {
                result += "[" + this.fs.getPathInfo(this.currentpath).filestype[key] + "]";
            }
            result += " ";
        }
        return result;
    }
    help(payload) {
        return "commends help";
    }
    cp(payload) {
        this.fs.createFile(payload[2]);
        return " ";
    }
    mv(payload) {
        if (this.fs.findDirectory(payload[2])) {
            this.fs.createFile(payload[2] + '/' + payload[1]);
        } else {
            this.fs.createDirectory(payload[1]);
            this.fs.createFile(payload[2] + '/' + payload[1]);
        }
        this.fs.deleteFile(payload[1]);
        return " ";
    }
    rm(payload) {
        let temp = this.currentpath;
        if (payload[1] == "*") {
            this.fs.deleteDirectory(this.currentpath);
            this.fs.createDirectory(this.currentpath);
        }
        if (this.fs.isOverlap(payload[1], this.currentpath) == false) {
            for (const key in this.fs.getPathInfo(this.currentpath).files) {
                if (this.fs.getPathInfo(this.currentpath).files[key] == payload[1]) {
                    if (this.fs.getPathInfo(this.currentpath).filestype[key] == "file") {
                        this.fs.deleteFile(temp += ("/" + payload[1]));
                    } else {
                        this.fs.deleteDirectory(temp += ("/" + payload[1]));
                    }
                }
            }
        }
        return " ";
    }
    mkdir(payload) {
        let temp = this.currentpath;
        temp += ("/" + payload[1]);
        this.fs.createDirectory(temp);
        return " ";
    }
    rmdir(payload) {
        let temp = this.currentpath;
        temp += ("/" + payload[1]);
        this.fs.deleteDirectory(temp);
        return " ";
    }

    cat(payload) {
        let printFile = "can't find file";
        console.log("result1:", printFile);
        if (this.isUserNode) {
            for (let index = 0; index < this.missionsDTO.userNode[0].userFile.length; index++) {
                if (this.fs.getPathInfo(this.currentpath).absolutePath + "" + payload[1] == this.missionsDTO.userNode[0].userFile[index].userFile_name) {
                    printFile = this.missionsDTO.userNode[0].userFile[index].userFile_content.toString().trim();
                }
            }
        } else {
            for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(this.currentIP)].nodeFile.length; index++) {
                if (this.fs.getPathInfo(this.currentpath).absolutePath + "" + payload[1] == this.missionsDTO.mission[this.savepoint].node[0].nodeFile[index].File_name) {
                    printFile = this.missionsDTO.mission[this.savepoint].node[0].nodeFile[index].File_content.toString().trim();
                }
            }
        }
        console.log("result2:", printFile);
        console.log("result2type :", typeof printFile);
        return printFile;
    }
    touch(payload) {
        let temp = this.currentpath;
        temp += ("/" + payload[1]);
        this.fs.createFile(temp);
        return " ";
    }
    vi(payload) {
        console.log("vi test", payload);
        if (this.fs.isOverlap(payload[1], this.currentpath)) {
            const temp = `touch ${payload[1]}`.split(' ');
            return this.touch(temp);
        } else {
            const temp = `cat ${payload[1]}`.split(' ');
            return this.cat(temp);
        }
    }
    //write 파일명 내용
    write(payload, context) {
        console.log("write test", payload, context);
        if (this.isUserNode) {
            for (let index = 0; index < this.missionsDTO.userNode[0].userFile.length; index++) {
                if (this.fs.getPathInfo(this.currentpath).absolutePath + "" + payload[1] == this.missionsDTO.userNode[0].userFile[index].userFile_name) {
                    this.missionsDTO.userNode[0].userFile[index].userFile_content = context;
                    break;
                } else {
                    const file: UserFileDTO = {
                        userFile_name: this.fs.getPathInfo(this.currentpath).absolutePath + "" + payload[1],
                        userFile_content: context
                    }
                    this.missionsDTO.userNode[0].userFile.push(file);
                    break;
                }
            }
        } else {
            for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(this.currentIP)].nodeFile.length; index++) {
                if (this.fs.getPathInfo(this.currentpath).absolutePath + "" + payload[1] == this.missionsDTO.mission[this.savepoint].node[0].nodeFile[index].File_name) {
                    this.missionsDTO.mission[this.savepoint].node[0].nodeFile[index].File_content = context;
                    break;
                } else {
                    const file: NodeFileDTO = {
                        File_name: this.fs.getPathInfo(this.currentpath).absolutePath + "" + payload[1],
                        File_content: context
                    }
                    this.missionsDTO.mission[this.savepoint].node[0].nodeFile.push(file);
                    break;
                }
            }
        }
        return "";
    }
    scan(payload) {

    }
    //porthack
    //scp
    //sshcrack
    //scan
    //connect
    //disconnect

    checkMission() {
        return this.missionsDTO; //xmlDTO리턴
    }
}





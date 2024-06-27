import { MissionsDTO } from "src/savefile/savefile.Dto";
import { FileSystem } from "./filesystemcore/fileSystems";


export class commends {
    fs: FileSystem = new FileSystem();
    currentIP: string = "";
    currentUser: string = "";
    currentpath: string = "";
    userId: string = "";
    userLocation: string = "";
    missionsDTO = null;
    constructor(userId: string, missionsDTO: MissionsDTO) {
        this.userId = userId;
        this.userLocation = `/game/${userId}`
        this.missionsDTO = missionsDTO;
    }
    setFs(dirlist: string[], filelist: string[], User: string, Ip: string) {
        this.currentIP = Ip;
        this.currentUser = User;
        for (let index = 0; index < dirlist.length; index++) {
            this.fs.createDirectory(dirlist[index].toString());
            console.log("tlqkf:", dirlist[index].toString());
        }
        console.log(this.fs);
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

        return
    }
    //ps
    //kill
    //nmap
    //porthack
    //scp
    //sshcrack
    //scan
    //connect
    //disconnect

    checkMission() {
        return; //xmlDTO리턴
    }
}




// terminal.write('Welcome to NetRunner!\r\n');
// let currentPath = '/home/user';
// prompt(currentPath);
// terminal.onKey(({ key, domEvent }) => {
//     const char = key;
//     if (domEvent.keyCode === 13) {  // Enter key
//         terminal.writeln('');
//         const command = currentInput.trim().split(" ");
//         switch (command[0]) {
//             case 'pwd':
//                 terminal.write(fs.getPathInfo(currentPath).absolutePath + '\r\n');
//                 break;
//             case 'cd':
//                 console.log(command[1]);
//                 if (command[1] === undefined) {
//                     currentPath = "/root";
//                 } else if (command[1] == '..') {
//                     if (currentPath == '/') {
//                         currentPath = '/';
//                     } else {
//                         let lastPath = currentPath.lastIndexOf("/");
//                         let temp = currentPath.substring(0, lastPath);
//                         currentPath = temp;
//                     }
//                 } else if (fs.isOverlap(command[1], currentPath) == false) {
//                     currentPath += ("/" + command[1]);
//                 } else if (fs.findDirectory(command[1]) == true) {
//                     currentPath = command[1];
//                 } else {
//                     terminal.write("No such path found\r\n");
//                 }
//                 break;
//             case 'cat':
//                 break;
//             case 'ls':
//                 for (const key in fs.getPathInfo(currentPath).files) {
//                     terminal.write(fs.getPathInfo(currentPath).files[key]);
//                     if (command[1] == "-al") {
//                         terminal.write("[" + fs.getPathInfo(currentPath).filestype[key] + "]");
//                     }
//                     terminal.write(" ");
//                 }
//                 terminal.write("\r\n");
//                 break;
//             case 'help':
//                 terminal.write('Commands:\r\nls - List files\r\nhelp - Show this help message\r\n');
//                 break;
//             case 'cp':
//                 break;
//             case 'mv':
//                 break;
//             case 'rm':
//                 let temp5 = currentPath;
//                 if (command[1] == "*") {
//                     fs.deleteDirectory(currentPath);
//                     fs.createDirectory(currentPath);
//                 }
//                 if (fs.isOverlap(command[1], currentPath) == false) {
//                     for (const key in fs.getPathInfo(currentPath).files) {
//                         if (fs.getPathInfo(currentPath).files[key] == command[1]) {
//                             if (fs.getPathInfo(currentPath).filestype[key] == "file") {
//                                 fs.deleteFile(temp5 += ("/" + command[1]));
//                             } else {
//                                 fs.deleteDirectory(temp5 += ("/" + command[1]));
//                             }
//                         }
//                     }
//                 }
//                 break;
//             case 'clear':
//                 terminal.clear();
//                 break;
//             case 'mkdir':
//                 let temp2 = currentPath;
//                 temp2 += ("/" + command[1]);
//                 fs.createDirectory(temp2);
//                 break;
//             case 'rmdir':
//                 let temp3 = currentPath;
//                 temp3 += ("/" + command[1]);
//                 fs.deleteDirectory(temp3);
//                 break;
//             case 'touch':
//                 let temp4 = currentPath;
//                 temp4 += ("/" + command[1]);
//                 fs.createFile(temp4);
//                 break;
//             case 'vi':
//                 break;


//             case 'ps':
//                 break;
//             case 'kill':
//                 break;
//             case 'nmap':
//                 break;
//             case 'porthack':
//                 break;
//             case 'scp':
//                 break;
//             case 'sshcrack':
//                 break;
//             case 'scan':
//                 break;
//             case 'connect':
//                 break;
//             case 'disconnect':
//                 break;


//             default:
//                 terminal.write('Unknown command\r\n');
//                 break;
//         }
//         currentInput = '';
//         prompt(currentPath);
//     } else if (domEvent.keyCode === 8) {
//         // Backspace 처리
//         if (currentInput.length > 0) {
//             terminal.write('\b \b'); // 터미널에서 문자를 제거
//             currentInput = currentInput.slice(0, -1);
//         }
//     } else {
//         currentInput += char;
//         terminal.write(char);
//     }
// });
// function prompt(location) {
//     if (location == "/root") {
//         location = '~';
//     }
//     terminal.write(`root@root[${location}]$`);
// }
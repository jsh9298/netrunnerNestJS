import { FileSystem } from "./fileSystems";
import { defLocation } from "./defLocation";


//JSON으로 날라오는 데이터 분석부분 만들어야함
const fs = new FileSystem();
fs.createDirectory("/root");
fs.createDirectory("/tmp");
fs.createDirectory("/home/user")
fs.createFile("/home/user/file1.txt");
fs.createFile("/home/user/file2.txt");
fs.createDirectory("/home/user/documents");
fs.createFile("/home/user/documents/document1.txt");
//세이브 로드,로드된 세이브를 토대로 초기화,게임로직,로그아웃이나 브라우저 종료시 로직값 저장ㄴ
//분석후 명령어들 결과 생성후 리턴 , 이 위치에 로케이션 getter setter 호출
export class commends {
    currentIP: any;
    currentFs: any;
    currentLocations: any;
    currentpath: any;
    constructor() {
        // this.currentIP = defLocation.getIPaddress();
        // this.currentLocations = defLocation.getFileSystems();
        // this.currentFs = new FileSystem();
        this.currentpath = "/"
    }
    pwd() {
        return fs.getPathInfo(this.currentpath).absolutePath+"";
    }
    cd(payload) {
        console.log("1",this.currentpath);
        if (payload[1] === undefined) {
            this.currentpath = "/";
            console.log("2",this.currentpath);
        } else if (payload[1] === '..') {
            if (this.currentpath == '/') {
                this.currentpath = '/';
            } else {
                let lastPath = this.currentpath.lastIndexOf("/");
                let temp = this.currentpath.substring(0, lastPath);
                this.currentpath = temp;
            }
            console.log("3",this.currentpath);
        } else if (fs.isOverlap(payload[1], this.currentpath) == false) {
            if(this.currentpath === "/"){
                this.currentpath += ("" + payload[1]);
            }else{
            this.currentpath += ("/" + payload[1]);
            }
            // console.log("4-1",this.currentpath);
            // let lastPath = this.currentpath.lastIndexOf("/");
            // console.log("4-2",lastPath);
            // let temp = this.currentpath.substring(0, lastPath);
            // console.log("4-3",temp);
            // this.currentpath = temp;
            console.log("4",this.currentpath);
        } else if (fs.findDirectory(payload[1]) == true) {
            this.currentpath = payload[1];
            console.log("5",this.currentpath);
        } else {
            return "No such path found";
        }
        return "";
    }
    ls(payload) {
        let result = '';
        for (const key in fs.getPathInfo(this.currentpath).files) {
            result += fs.getPathInfo(this.currentpath).files[key];
            if (payload[1] == "-al") {
                result += "[" + fs.getPathInfo(this.currentpath).filestype[key] + "]";
            }
            result += " ";
        }
        return result;
    }
    help(payload) {
        return "commends help";
    }
    cp(payload) {
        return " ";
    }
    mv(payload) {
        return " ";
    }
    rm(payload) {
        let temp = this.currentpath;
        if (payload[1] == "*") {
            fs.deleteDirectory(this.currentpath);
            fs.createDirectory(this.currentpath);
        }
        if (fs.isOverlap(payload[1], this.currentpath) == false) {
            for (const key in fs.getPathInfo(this.currentpath).files) {
                if (fs.getPathInfo(this.currentpath).files[key] == payload[1]) {
                    if (fs.getPathInfo(this.currentpath).filestype[key] == "file") {
                        fs.deleteFile(temp += ("/" + payload[1]));
                    } else {
                        fs.deleteDirectory(temp += ("/" + payload[1]));
                    }
                }
            }
        }
        return " ";
    }
    mkdir(payload) {
        let temp = this.currentpath;
        temp += ("/"+payload[1]);
        fs.createDirectory(temp);
        return " ";
    }
    rmdir(payload) {
        let temp =  this.currentpath;
        temp += ("/" + payload[1]);
        fs.deleteDirectory(temp);
        return " ";
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
}

//리턴값들을 JSON으로 재조립후 전송








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
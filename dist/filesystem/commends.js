"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commends = void 0;
const fileSystems_1 = require("./filesystemcore/fileSystems");
const user_entity_1 = require("../auth/users/user.entity");
const stack_1 = require("./stack");
const crypto = require("crypto");
class commends {
    constructor(xmlService, userId, missionsDTO, savepoint) {
        this.xmlService = xmlService;
        this.fs = null;
        this.currentIP = "";
        this.userIP = "";
        this.currentUser = "";
        this.currentpath = "";
        this.userId = "";
        this.userLocation = "";
        this.missionsDTO = null;
        this.isUserNode = true;
        this.nodelist = new Map();
        this.currentNode = 0;
        this.userId = userId;
        this.userLocation = `/game/${userId}`;
        this.missionsDTO = missionsDTO;
        this.savepoint = savepoint;
        if (this.missionsDTO) {
            this.mkNodeList();
            this.userIP = this.missionsDTO.userNode.userIP;
        }
        this.sshhistory = new stack_1.Stack();
        console.log("init SavePoint : ", this.savepoint);
    }
    async setFs(dirlist, filelist, uSer, Ip) {
        this.fs = new fileSystems_1.FileSystem();
        this.currentIP = Ip;
        this.currentUser = uSer;
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
        this.fs.createDirectory("/var/log/syslog");
        console.log("dirlist:", dirlist);
        for (let index = 0; index < dirlist.length; index++) {
            this.fs.createDirectory(dirlist[index].toString());
        }
        for (let index = 0; index < filelist.length; index++) {
            this.fs.createFile(filelist[index].toString());
        }
        if (this.currentUser === 'root') {
            this.currentpath = '/root';
        }
        else if (this.currentUser === '/') {
            this.currentpath = '/';
        }
        else {
            this.currentpath = `/home/${this.currentUser}`;
        }
        const userId = this.userId;
        const user = await user_entity_1.User.findOne({ where: { userId } });
        this.savepoint = user.savepoint;
    }
    mkNodeList() {
        for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node.length; index++) {
            this.nodelist.set(this.missionsDTO.mission[this.savepoint].node[index].nodeIP.toString(), index);
        }
        console.log(this.nodelist.entries());
        console.log(this.nodelist.get("192.168.25.3"));
    }
    pwd() {
        return this.fs.getPathInfo(this.currentpath).absolutePath + "";
    }
    cd(payload) {
        if (payload[1] === undefined) {
            if (this.currentUser == 'root') {
                this.currentpath = '/root';
            }
            else if (this.currentUser === '/') {
                this.currentpath = '/';
            }
            else {
                this.currentpath = `/home/${this.currentUser}`;
            }
        }
        else if (payload[1] === '..') {
            if (this.currentpath == '/') {
                this.currentpath = '/';
            }
            else {
                let lastPath = this.currentpath.lastIndexOf("/");
                let temp = this.currentpath.substring(0, lastPath);
                this.currentpath = temp;
            }
        }
        else if (this.fs.isOverlap(payload[1], this.currentpath) == false) {
            if (this.currentpath === "/") {
                this.currentpath += ("" + payload[1]);
            }
            else {
                this.currentpath += ("/" + payload[1]);
            }
        }
        else if (this.fs.findDirectory(payload[1]) == true) {
            this.currentpath = payload[1];
        }
        else {
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
        const help1 = "pwd: 현재위치를 출력합니다 \r\ncd: cd[절대경로 | 현재위치의 하위 경로 | .. ] 위치 이동 명령어입니다.\r\nls: 현재경로에 존재하는 파일, 디렉터리들을 표시합니다.\r\ncp: cp[파일명] 파일을 복제합니다.\n";
        const help2 = "mv: mv[이동시킬 파일명][옮길 경로] 파일을 이동합니다.\r\nrm: rm[파일명 | * ] 현재경로의 파일을 삭제합니다. * 를 사용하면 전부 제거합니다.\r\nmkdir: mkdir[디렉터리명] 디렉터리를 생성합니다.\r\nrmdir: rmdir[디렉터리명] 디렉터리를 삭제합니다.\n";
        const help3 = "cat: cat[파일명] 해당 위치에 존재하는 파일의 내용을 출력합니다.\r\ntouch: touch[파일명] 빈파일을 생성합니다.\r\nvi: vi[파일명] 파일을 생성하거나, 수정 및 저장을 합니다.\r\nscan: scan[CIDR] 현재 미션에서 접근해야할 노드들의 정보를 스캔합니다.\n";
        const help4 = "ssh: ssh[ip주소] 해당주소가 노드중에 존재할경우, 그리고 해당 포트닥 열려있는 경우 이동합니다.exit로 나올수있습니다.\r\niptables: 엄..퀘스트를 확인하세요.\r\nFTPBounce: FTPBounce[21 | 69] ftp포트 해제 \r\nscp: scp[파일명][대상id@대상ip:경로] 파일을 대상ip의 경로로 복사합니다.\n";
        if (payload.length < 2) {
            return "help [1~4]로 입력해주세요.";
        }
        if (payload[1] == '1') {
            return help1;
        }
        else if (payload[1] == '2') {
            return help2;
        }
        else if (payload[1] == '3') {
            return help3;
        }
        else if (payload[1] == '4') {
            return help4;
        }
        else {
            return "이제 없어요.";
        }
    }
    cp(payload) {
        this.fs.createFile(this.pwd() + payload[2]);
        this.xmlService.updateXml(this.userId, this.missionsDTO);
        return " ";
    }
    mv(payload) {
        if (this.fs.findDirectory(payload[2])) {
            this.fs.createFile(payload[2] + '/' + payload[1]);
        }
        else {
            this.fs.createDirectory(payload[1]);
            this.fs.createFile(payload[2] + '/' + payload[1]);
        }
        this.fs.deleteFile(payload[1]);
        this.xmlService.updateXml(this.userId, this.missionsDTO);
        return " ";
    }
    rm(payload) {
        let temp = this.currentpath;
        if (payload[1] == "*") {
            this.fs.deleteDirectory(this.currentpath);
            this.fs.createDirectory(this.currentpath);
            if (this.isUserNode) {
                for (let index = 0; index < this.missionsDTO.userNode.userDirectorys[0].userDirPath.length; index++) {
                    if (this.missionsDTO.userNode.userDirectorys[0].userDirPath[index].includes(this.currentpath)) {
                        this.missionsDTO.userNode.userDirectorys[0].userDirPath.splice(index, 1);
                    }
                }
                for (let index = 0; index < this.missionsDTO.userNode.userFile.length; index++) {
                    if (this.missionsDTO.userNode.userFile[index].includes(this.currentpath)) {
                        this.missionsDTO.userNode.userFile.splice(index, 1);
                    }
                }
            }
            else {
                for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeDirectorys[0].dirPath.length; index++) {
                    if (this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeDirectorys[0].dirPath[index].includes(this.currentpath)) {
                        this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeDirectorys[0].dirPath.splice(index, 1);
                    }
                }
                for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile.length; index++) {
                    if (this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile[index].includes(this.currentpath)) {
                        this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile.splice(index, 1);
                    }
                }
            }
        }
        if (this.fs.isOverlap(payload[1], this.currentpath) == false) {
            for (const key in this.fs.getPathInfo(this.currentpath).files) {
                if (this.fs.getPathInfo(this.currentpath).files[key] == payload[1]) {
                    if (this.fs.getPathInfo(this.currentpath).filestype[key] == "file") {
                        this.fs.deleteFile(temp += ("/" + payload[1]));
                        if (this.isUserNode) {
                            for (let index = 0; index < this.missionsDTO.userNode.userFile.length; index++) {
                                if (this.missionsDTO.userNode.userFile[index] == (temp += ("/" + payload[1]))) {
                                    this.missionsDTO.userNode.userFile.splice(index, 1);
                                }
                            }
                        }
                        else {
                            for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile.length; index++) {
                                if (this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile[index] == (temp += ("/" + payload[1]))) {
                                    this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile.splice(index, 1);
                                }
                            }
                        }
                    }
                }
                else {
                    this.fs.deleteDirectory(temp += ("/" + payload[1]));
                    if (this.isUserNode) {
                        for (let index = 0; index < this.missionsDTO.userNode.userDirectorys[0].userDirPath.length; index++) {
                            if (this.missionsDTO.userNode.userDirectorys[0].userDirPath[index] == temp) {
                                this.missionsDTO.userNode.userDirectorys[0].userDirPath.splice(index, 1);
                            }
                        }
                    }
                    else {
                        for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeDirectorys[0].dirPath.length; index++) {
                            if (this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeDirectorys[0].dirPath[index] == temp) {
                                this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeDirectorys[0].dirPath.splice(index, 1);
                            }
                        }
                    }
                }
            }
        }
        this.xmlService.updateXml(this.userId, this.missionsDTO);
        return " ";
    }
    mkdir(payload) {
        let temp = this.currentpath;
        temp += ("/" + payload[1]);
        this.fs.createDirectory(temp);
        console.log(this.missionsDTO.userNode.userDirectorys[0].userDirPath);
        console.log(this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeDirectorys[0].dirPath);
        const context = " ";
        if (this.isUserNode) {
            this.missionsDTO.userNode.userDirectorys[0].userDirPath.push(temp);
        }
        else {
            this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeDirectorys[0].dirPath.push(temp);
        }
        this.xmlService.updateXml(this.userId, this.missionsDTO);
        return " ";
    }
    rmdir(payload) {
        let temp = this.currentpath;
        temp += ("/" + payload[1]);
        this.fs.deleteDirectory(temp);
        if (this.isUserNode) {
            for (let index = 0; index < this.missionsDTO.userNode.userDirectorys[0].userDirPath.length; index++) {
                if (this.missionsDTO.userNode.userDirectorys[0].userDirPath[index] == temp) {
                    this.missionsDTO.userNode.userDirectorys[0].userDirPath.splice(index, 1);
                }
            }
        }
        else {
            for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeDirectorys[0].dirPath.length; index++) {
                if (this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeDirectorys[0].dirPath[index] == temp) {
                    this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeDirectorys[0].dirPath.splice(index, 1);
                }
            }
        }
        this.xmlService.updateXml(this.userId, this.missionsDTO);
        return " ";
    }
    cat(payload) {
        console.log("userNode check Cat:", this.missionsDTO);
        let printFile = " ";
        if (this.isUserNode) {
            for (let index = 0; index < this.missionsDTO.userNode.userFile.length; index++) {
                if (this.fs.getPathInfo(this.currentpath).absolutePath + "" + payload[1] == this.missionsDTO.userNode.userFile[index].userFile_name) {
                    printFile = this.missionsDTO.userNode.userFile[index].userFile_content.toString().trim();
                }
            }
        }
        else {
            for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile.length; index++) {
                if (this.fs.getPathInfo(this.currentpath).absolutePath + "" + payload[1] == this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile[index].File_name) {
                    printFile = this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile[index].File_content.toString().trim();
                }
            }
        }
        return printFile;
    }
    touch(payload) {
        let temp = this.currentpath;
        temp += ("/" + payload[1]);
        this.fs.createFile(temp);
        const context = " ";
        if (this.isUserNode) {
            const file = {
                userFile_name: this.fs.getPathInfo(this.currentpath).absolutePath + "" + payload[1],
                userFile_content: context
            };
            this.missionsDTO.userNode.userFile.push(file);
        }
        else {
            const file = {
                File_name: this.fs.getPathInfo(this.currentpath).absolutePath + "" + payload[1],
                File_content: context
            };
            this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile.push(file);
        }
        this.xmlService.updateXml(this.userId, this.missionsDTO);
        return " ";
    }
    vi(payload) {
        if (this.fs.isOverlap(payload[1], this.currentpath)) {
            const temp = `touch ${payload[1]}`.split(' ');
            return this.touch(temp);
        }
        else {
            const temp = `cat ${payload[1]}`.split(' ');
            return this.cat(temp);
        }
    }
    async write(payload, context) {
        if (this.isUserNode) {
            for (let index = 0; index < this.missionsDTO.userNode.userFile.length; index++) {
                if (this.fs.getPathInfo(this.currentpath).absolutePath + "" + payload[1] == this.missionsDTO.userNode.userFile[index].userFile_name) {
                    this.missionsDTO.userNode.userFile[index].userFile_content = [context];
                    break;
                }
                else {
                    const file = {
                        userFile_name: this.fs.getPathInfo(this.currentpath).absolutePath + "" + payload[1],
                        userFile_content: context
                    };
                    this.missionsDTO.userNode.userFile.push(file);
                    break;
                }
            }
        }
        else {
            for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile.length; index++) {
                if (this.fs.getPathInfo(this.currentpath).absolutePath + "" + payload[1] == this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile[index].File_name) {
                    this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile[index].File_content = [context];
                    break;
                }
                else {
                    const file = {
                        File_name: this.fs.getPathInfo(this.currentpath).absolutePath + "" + payload[1],
                        File_content: context
                    };
                    this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile.push(file);
                    break;
                }
            }
        }
        this.xmlService.updateXml(this.userId, this.missionsDTO);
        return "";
    }
    scan(payload) {
        let result = "";
        if (/^([0-9]{1,3}\.){3}[0-9]{1,3}\/([0-9]|[1-2][0-9]|3[0-2])$/gm.test(payload[1])) {
            for (let index = 0; index < this.nodelist.size; index++) {
                console.log(this.getKeyByValue(this.nodelist, index));
                if (this.calcSubnet(payload[1], this.getKeyByValue(this.nodelist, index)) === true) {
                    const username = "username { node" + (index + 1).toString().padStart(2, '0') + " }\n\r";
                    const ip = `IP{ ${this.getKeyByValue(this.nodelist, index)} }\n\r`;
                    let ports = "Port[ ";
                    for (let index2 = 0; index2 < this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(this.getKeyByValue(this.nodelist, index))].nodePort[0].TCP[0].service.length; index2++) {
                        if (this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(this.getKeyByValue(this.nodelist, index))].nodePort[0].TCP[0].service[index2].servicePort != '') {
                            ports += `{${this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(this.getKeyByValue(this.nodelist, index))].nodePort[0].TCP[0].service[index2].servicePort} : ${this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(this.getKeyByValue(this.nodelist, index))].nodePort[0].TCP[0].service[index2].portState}} \n\r`;
                        }
                    }
                    for (let index2 = 0; index2 < this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(this.getKeyByValue(this.nodelist, index))].nodePort[0].UDP[0].service.length; index2++) {
                        if (this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(this.getKeyByValue(this.nodelist, index))].nodePort[0].UDP[0].service[index2].servicePort != '') {
                            ports += `{${this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(this.getKeyByValue(this.nodelist, index))].nodePort[0].UDP[0].service[index2].servicePort} : ${this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(this.getKeyByValue(this.nodelist, index))].nodePort[0].UDP[0].service[index2].portState}} \n\r`;
                        }
                    }
                    ports += " ]\n\r";
                    result += username + ip + ports;
                }
                else {
                    result = "can't find nodes";
                }
            }
        }
        else {
            result = "Invalid cidr";
        }
        if (payload[2] && payload[2] == '>') {
            const temp = `write ${payload[3]}`.split(' ');
            this.write(temp, result);
        }
        return result;
    }
    ssh(payload) {
        if (this.nodelist.has(payload[1])) {
            if (this.checkPortOpen(payload[1], "22")) {
                this.currentIP = payload[1];
                this.isUserNode = false;
                this.currentNode = this.nodelist.get(payload[1].toString());
                this.currentUser = "node" + (this.currentNode + 1).toString().padStart(2, '0');
                let dirlist = [];
                for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeDirectorys[0].dirPath.length; index++) {
                    dirlist.push(this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeDirectorys[0].dirPath[index]);
                }
                let filelist = [];
                for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile.length; index++) {
                    filelist.push(this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodeFile[index].File_name);
                }
                console.log(this.currentNode, this.savepoint, dirlist, filelist);
                const item = {
                    dirlist: dirlist,
                    filelist: filelist,
                    currentUser: this.currentUser,
                    currentIP: this.currentIP
                };
                this.sshhistory.push(item);
                this.setFs(dirlist, filelist, this.currentUser, this.currentIP);
                return `connected ${payload[1]}`;
            }
            else {
                return "Port access denied";
            }
        }
        else {
            return "can't find host";
        }
    }
    exit() {
        let filelist = [];
        let dirlist = [];
        if (this.sshhistory.size() > 0) {
            console.log("before pop", this.sshhistory);
            const preNode = this.sshhistory.pop();
            console.log("pop data", preNode);
            console.log("after pop", this.sshhistory);
            this.currentNode = this.nodelist.get(preNode.currentIP);
            this.isUserNode = false;
            this.currentUser = preNode.currentUser;
            this.currentIP = preNode.currentIP;
            filelist = preNode.filelist;
            dirlist = preNode.dirlist;
        }
        else {
            if (this.isUserNode) {
                return "Unknown commands";
            }
            this.currentIP = this.userIP;
            this.isUserNode = true;
            this.currentNode = 0;
            this.currentUser = "myNode";
            dirlist = this.missionsDTO.userNode.userDirectorys[0].userDirPath.slice();
            filelist = this.missionsDTO.userNode.userFile.map(file => file.userFile_name);
        }
        this.setFs(dirlist, filelist, this.currentUser, this.currentIP);
        return "Disconnected";
    }
    iptables(payload) {
        let isTCP = undefined;
        let isOpen = undefined;
        let portnum = undefined;
        for (let index = 1; index < payload.length; index++) {
            if (/^(0|[1-9][0-9]{0,4}|[1-5][0-9]{0,4}|6[0-4][0-9]{0,3}|65[0-3][0-9]{0,2}|655[0-2][0-9]{0,1}|6553[0-5])$/gm.test(payload[index])) {
                portnum = payload[index];
            }
            if (payload[index] == 'tcp') {
                isTCP = true;
            }
            if (payload[index] == 'udp') {
                isTCP = false;
            }
            if (payload[index] == 'DROP') {
                isOpen = false;
            }
            if (payload[index] == 'ACCEPT') {
                isOpen = true;
            }
        }
        if (this.isUserNode == false) {
            if (isTCP) {
                for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodePort[0].TCP[0].service.length; index++) {
                    if (this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodePort[0].TCP[0].service[index].servicePort == portnum) {
                        if (isOpen) {
                            this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodePort[0].TCP[0].service[index].portState = "OPEN";
                        }
                        else {
                            this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodePort[0].TCP[0].service[index].portState = "CLOSED";
                        }
                    }
                }
            }
            else {
                for (let index = 0; index < this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodePort[0].UDP[0].service.length; index++) {
                    if (this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodePort[0].UDP[0].service[index].servicePort == portnum) {
                        if (isOpen) {
                            this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodePort[0].UDP[0].service[index].portState = "OPEN";
                        }
                        else {
                            this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodePort[0].TCP[0].service[index].portState = "CLOSED";
                        }
                    }
                }
            }
        }
        else {
            if (isTCP) {
                for (let index = 0; index < this.missionsDTO.userNode.userPort[0].userTCP[0].userService.length; index++) {
                    if (this.missionsDTO.userNode.userPort[0].userTCP[0].userService[index].userServicePort == portnum) {
                        if (isOpen) {
                            this.missionsDTO.userNode.userPort[0].userTCP[0].userService[index].userPortState = "OPEN";
                        }
                        else {
                            this.missionsDTO.userNode.userPort[0].userTCP[0].userService[index].userPortState = "CLOSED";
                        }
                    }
                }
            }
            else {
                for (let index = 0; index < this.missionsDTO.userNode.userPort[0].userUDP[0].userService.length; index++) {
                    if (this.missionsDTO.userNode.userPort[0].userUDP[0].userService[index].userServicePort == portnum) {
                        if (isOpen) {
                            this.missionsDTO.userNode.userPort[0].userUDP[0].userService[index].userPortState = "OPEN";
                        }
                        else {
                            this.missionsDTO.userNode.userPort[0].userTCP[0].userService[index].userPortState = "CLOSED";
                        }
                    }
                }
            }
        }
        console.log("test:", payload, this.isUserNode, isTCP, isOpen, portnum);
        this.xmlService.updateXml(this.userId, this.missionsDTO);
        this.loggging("iptables", this.currentIP, this.currentUser, `${portnum}:${isOpen ? 'OPEN' : 'CLOSED'}`);
        return "complete";
    }
    FTPbounce(payload) {
        let fin = false;
        if (payload[1] === '21' || payload[1] === '69') {
            if (this.isUserNode == false) {
                if (payload[1] == '21') {
                    for (let index2 = 0; index2 < this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodePort[0].TCP[0].service.length; index2++) {
                        if (this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodePort[0].TCP[0].service[index2].serviceName == "FTP") {
                            this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodePort[0].TCP[0].service[index2].portState = "OPEN";
                            fin = true;
                            break;
                        }
                    }
                }
                else if (payload[1] == '69') {
                    for (let index2 = 0; index2 < this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodePort[0].UDP[0].service.length; index2++) {
                        if (this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodePort[0].UDP[0].service[index2].serviceName == "TFTP") {
                            this.missionsDTO.mission[this.savepoint].node[this.currentNode].nodePort[0].UDP[0].service[index2].portState = "OPEN";
                            fin = true;
                            break;
                        }
                    }
                }
            }
            else {
                if (payload[1] == '21') {
                    for (let index = 0; index < this.missionsDTO.userNode.userPort[0].userTCP[0].userService.length; index++) {
                        if (this.missionsDTO.userNode.userPort[0].userTCP[0].userService[index].userServiceName == "FTP") {
                            this.missionsDTO.userNode.userPort[0].userTCP[0].userService[index].userPortState = "OPEN";
                            fin = true;
                            break;
                        }
                    }
                }
                else if (payload[1] == '69') {
                    for (let index = 0; index < this.missionsDTO.userNode.userPort[0].userUDP[0].userService.length; index++) {
                        if (this.missionsDTO.userNode.userPort[0].userUDP[0].userService[index].userServiceName == "TFTP") {
                            this.missionsDTO.userNode.userPort[0].userUDP[0].userService[index].userPortState = "OPEN";
                            fin = true;
                            break;
                        }
                    }
                }
            }
            if (fin) {
                this.xmlService.updateXml(this.userId, this.missionsDTO);
                this.loggging("FTPBounce", this.currentIP, this.currentUser, `${payload[1]}:OPEN`);
                return "complete.";
            }
            else {
                return "failed.";
            }
        }
        else {
            return "Wrong port number";
        }
    }
    scp(payload) {
        try {
            let temp1 = payload[2].split('@');
            console.log("temp1:", temp1);
            let temp2 = temp1[1].split(':');
            console.log("temp2:", temp2);
            const destID = temp1[0];
            const destIP = temp2[0];
            const destLocate = temp2[1];
            console.log("SCP:", destID, destIP, destLocate);
            console.log(this.nodelist.values());
            const temp = `cat ${payload[1]}`.split(' ');
            const context = this.cat(temp);
            if (this.checkPortOpen(destIP, "22")) {
                if (this.isUserNode == false) {
                    if (destIP == '192.168.25.2') {
                        if (this.fs.isOverlap(payload[1], this.currentpath) == false) {
                            const file = {
                                userFile_name: destLocate + "/" + payload[1],
                                userFile_content: context
                            };
                            this.missionsDTO.userNode.userFile.push(file);
                        }
                    }
                    else {
                        if (this.nodelist.has(destIP)) {
                            if (this.fs.isOverlap(payload[1], this.currentpath) == false) {
                                const file = {
                                    File_name: destLocate + "/" + payload[1],
                                    File_content: context
                                };
                                this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(destIP)].nodeFile.push(file);
                            }
                        }
                        else {
                            return "can't find host";
                        }
                    }
                }
                else {
                    if (this.nodelist.has(destIP)) {
                        if (this.fs.isOverlap(payload[1], this.currentpath) == false) {
                            const file = {
                                File_name: destLocate + "/" + payload[1],
                                File_content: context
                            };
                            this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(destIP)].nodeFile.push(file);
                        }
                    }
                    else {
                        return "can't find host";
                    }
                }
                this.xmlService.updateXml(this.userId, this.missionsDTO);
                return "complete";
            }
            else {
                return "Port access denied";
            }
        }
        catch (error) {
            return "wrong input";
        }
    }
    porthack(payload) {
        console.log(payload);
        console.log(this.nodelist.get(payload[1].toString()));
        for (let index2 = 0; index2 < this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].TCP[0].service.length; index2++) {
            if (this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].TCP[0].service[index2].servicePort == payload[2]) {
                this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].TCP[0].service[index2].portState = "OPEN";
                break;
            }
        }
        for (let index2 = 0; index2 < this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].UDP[0].service.length; index2++) {
            if (this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].UDP[0].service[index2].servicePort == payload[2]) {
                this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].UDP[0].service[index2].portState = "OPEN";
                break;
            }
        }
        this.xmlService.updateXml(this.userId, this.missionsDTO);
        return 'true';
    }
    SSHcrack(payload) {
        console.log(payload);
        console.log(this.nodelist.get(payload[1].toString()));
        for (let index2 = 0; index2 < this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].TCP[0].service.length; index2++) {
            if (this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].TCP[0].service[index2].servicePort == payload[2]) {
                this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].TCP[0].service[index2].portState = "OPEN";
                break;
            }
        }
        for (let index2 = 0; index2 < this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].UDP[0].service.length; index2++) {
            if (this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].UDP[0].service[index2].servicePort == payload[2]) {
                this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].UDP[0].service[index2].portState = "OPEN";
                break;
            }
        }
        this.xmlService.updateXml(this.userId, this.missionsDTO);
        return 'true';
    }
    SMTPoverflow(payload) {
        console.log(payload);
        console.log(this.nodelist.get(payload[1].toString()));
        for (let index2 = 0; index2 < this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].TCP[0].service.length; index2++) {
            if (this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].TCP[0].service[index2].servicePort == payload[2]) {
                this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].TCP[0].service[index2].portState = "OPEN";
                break;
            }
        }
        for (let index2 = 0; index2 < this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].UDP[0].service.length; index2++) {
            if (this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].UDP[0].service[index2].servicePort == payload[2]) {
                this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].UDP[0].service[index2].portState = "OPEN";
                break;
            }
        }
        this.xmlService.updateXml(this.userId, this.missionsDTO);
        return 'true';
    }
    WebServerWorm(payload) {
        console.log(payload);
        console.log(this.nodelist.get(payload[1].toString()));
        for (let index2 = 0; index2 < this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].TCP[0].service.length; index2++) {
            if (this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].TCP[0].service[index2].servicePort == payload[2]) {
                this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].TCP[0].service[index2].portState = "OPEN";
                break;
            }
        }
        for (let index2 = 0; index2 < this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].UDP[0].service.length; index2++) {
            if (this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].UDP[0].service[index2].servicePort == payload[2]) {
                this.missionsDTO.mission[this.savepoint].node[this.nodelist.get(payload[1].toString())].nodePort[0].UDP[0].service[index2].portState = "OPEN";
                break;
            }
        }
        this.xmlService.updateXml(this.userId, this.missionsDTO);
        return 'true';
    }
    Decypher(payload) {
        const context = this.cat(`cat ${payload[1]}`.split(" "));
        if (payload[1].includes(".encoded") && context) {
            const algorithm = 'aes-256-cbc';
            const key = 'abcdefghijklmnopqrstuvwxyz123456';
            const iv = "1234567890123456";
            const decipher = (content, key) => {
                const decode = crypto.createDecipheriv(algorithm, key, iv);
                const decodeResult = decode.update(content, 'base64', 'utf8')
                    + decode.final('utf8');
                return decodeResult;
            };
            this.vi(`vi ${payload[1].replace('.encoded', '.txt')}`.split(" "));
            this.write(`write ${payload[1].replace('.encoded', '.txt')}`.split(" "), decipher(context, key));
            return 'true';
        }
        else {
            return 'false';
        }
    }
    DECHead(payload) {
        if (payload[1].includes(".encoded")) {
            const filecontext = this.cat(`cat ${payload[1]}`.split(" "));
            const algorithm = 'aes-256-cbc';
            const key = 'abcdefghijklmnopqrstuvwxyz123456';
            const iv = "1234567890123456";
            const decipher = (context, key) => {
                const decode = crypto.createDecipheriv(algorithm, key, iv);
                const decodeResult = decode.update(context, 'base64', 'utf8')
                    + decode.final('utf8');
                return decodeResult;
            };
            const context = decipher(filecontext, key);
            if (context) {
                const result = context.match(/(node[0-9]{0,2}@[0-9]{0,3}.[0-9]{0,3}.[0-9]{0,3}.[0-9]{0,3})/m).toString();
                this.vi(`vi ${payload[1].replace('.encoded', 'header.txt')}`.split(" "));
                this.write(`write ${payload[1].replace('.encoded', 'header.txt')}`.split(" "), decipher(context, key));
                return 'true';
            }
            else {
                return 'false';
            }
        }
    }
    loggging(cmd, addr, name, data) {
        this.fs.createDirectory("/var/log/syslog");
        const textData = cmd + '\n' + addr + '\n' + name + '\n' + data;
        for (let index = 0; index < this.missionsDTO.userNode.userFile.length; index++) {
            if (this.missionsDTO.userNode.userFile[index].userFile_name == `/var/log/syslog/${cmd}.log`) {
                this.missionsDTO.userNode.userFile[index].userFile_content = [textData];
                break;
            }
            else {
                const file = {
                    userFile_name: `/var/log/syslog/${cmd}.log`,
                    userFile_content: textData
                };
                this.missionsDTO.userNode.userFile.push(file);
                break;
            }
        }
        this.xmlService.updateXml(this.userId, this.missionsDTO);
    }
    checkPortOpen(destIP, portNumber) {
        console.log(destIP);
        console.log(destIP.toString());
        console.log(portNumber);
        const destNode = this.nodelist.get(destIP.toString());
        let isPortOpen = false;
        if (destIP.toString() != '192.168.25.2') {
            for (let index2 = 0; index2 < this.missionsDTO.mission[this.savepoint].node[destNode].nodePort[0].TCP[0].service.length; index2++) {
                if (this.missionsDTO.mission[this.savepoint].node[destNode].nodePort[0].TCP[0].service[index2].servicePort == portNumber) {
                    this.missionsDTO.mission[this.savepoint].node[destNode].nodePort[0].TCP[0].service[index2].portState == "OPEN" ? isPortOpen = true : isPortOpen = false;
                    break;
                }
            }
            for (let index2 = 0; index2 < this.missionsDTO.mission[this.savepoint].node[destNode].nodePort[0].UDP[0].service.length; index2++) {
                if (this.missionsDTO.mission[this.savepoint].node[destNode].nodePort[0].UDP[0].service[index2].servicePort == portNumber) {
                    this.missionsDTO.mission[this.savepoint].node[destNode].nodePort[0].UDP[0].service[index2].portState == "OPEN" ? isPortOpen = true : isPortOpen = false;
                    break;
                }
            }
        }
        else {
            for (let index = 0; index < this.missionsDTO.userNode.userPort[0].userTCP[0].userService.length; index++) {
                if (this.missionsDTO.userNode.userPort[0].userTCP[0].userService[index].userServicePort == portNumber) {
                    this.missionsDTO.userNode.userPort[0].userTCP[0].userService[index].userPortState == "OPEN" ? isPortOpen = true : isPortOpen = false;
                    break;
                }
            }
            for (let index = 0; index < this.missionsDTO.userNode.userPort[0].userUDP[0].userService.length; index++) {
                if (this.missionsDTO.userNode.userPort[0].userUDP[0].userService[index].userServicePort == portNumber) {
                    this.missionsDTO.userNode.userPort[0].userUDP[0].userService[index].userPortState == "OPEN" ? isPortOpen = true : isPortOpen = false;
                    break;
                }
            }
        }
        return isPortOpen;
    }
    calcSubnet(cidraddress, ipaddress) {
        const [cidrAddress, cidrPrefix] = cidraddress.split('/');
        const ipParts = ipaddress.split('.');
        const ipNum = (parseInt(ipParts[0]).toString(2).padStart(8, '0')) +
            (parseInt(ipParts[1]).toString(2).padStart(8, '0')) +
            (parseInt(ipParts[2]).toString(2).padStart(8, '0')) +
            (parseInt(ipParts[3]).toString(2).padStart(8, '0'));
        const cidrIpParts = cidrAddress.split('.');
        const cidrNum = (parseInt(cidrIpParts[0]).toString(2).padStart(8, '0')) +
            (parseInt(cidrIpParts[1]).toString(2).padStart(8, '0')) +
            (parseInt(cidrIpParts[2]).toString(2).padStart(8, '0')) +
            (parseInt(cidrIpParts[3]).toString(2).padStart(8, '0'));
        const maskAddr = new Array().fill('0', 0, 31);
        for (let index = 0; index < parseInt(cidrPrefix); index++) {
            maskAddr[index] = '1';
        }
        for (let index = parseInt(cidrPrefix); index < 32; index++) {
            maskAddr[index] = '0';
        }
        const mask = maskAddr.join("");
        const ip = parseInt(ipNum, 2);
        const cip = parseInt(cidrNum, 2);
        const msk = parseInt(mask, 2);
        return (ip & msk) === (cip & msk);
    }
    getKeyByValue(map, value) {
        const entries = Object.entries(Object.fromEntries(map));
        const found = entries.find(([key, val]) => val === value);
        return found ? found[0] : undefined;
    }
}
exports.commends = commends;
//# sourceMappingURL=commends.js.map
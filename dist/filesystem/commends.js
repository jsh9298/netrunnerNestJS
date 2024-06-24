"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commends = void 0;
class commends {
    constructor() {
        this.fs = null;
        this.currentIP = "";
        this.currentUser = "";
        this.currentpath = "";
    }
    setFs(fileSystem, dirlist, filelist, User, Ip) {
        this.currentIP = Ip;
        this.currentUser = User;
        this.fs = fileSystem;
        for (let index = 0; index < dirlist.length; index++) {
            fileSystem.createDirectory(dirlist[index]);
        }
        for (let index = 0; index < filelist.length; index++) {
            fileSystem.createFile(filelist[index]);
        }
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
    prompt() {
        return this.currentUser + "@" + this.currentIP;
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
            this.fs.deleteDirectory(this.currentpath);
            this.fs.createDirectory(this.currentpath);
        }
        if (this.fs.isOverlap(payload[1], this.currentpath) == false) {
            for (const key in this.fs.getPathInfo(this.currentpath).files) {
                if (this.fs.getPathInfo(this.currentpath).files[key] == payload[1]) {
                    if (this.fs.getPathInfo(this.currentpath).filestype[key] == "file") {
                        this.fs.deleteFile(temp += ("/" + payload[1]));
                    }
                    else {
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
}
exports.commends = commends;
//# sourceMappingURL=commends.js.map
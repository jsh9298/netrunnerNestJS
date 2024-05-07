"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commends = void 0;
const fileSystems_1 = require("./fileSystems");
const fs = new fileSystems_1.FileSystem();
fs.createDirectory("/root");
fs.createDirectory("/tmp");
fs.createDirectory("/home/user");
fs.createFile("/home/user/file1.txt");
fs.createFile("/home/user/file2.txt");
fs.createDirectory("/home/user/documents");
fs.createFile("/home/user/documents/document1.txt");
class commends {
    constructor() {
        this.currentpath = "/";
    }
    pwd() {
        return fs.getPathInfo(this.currentpath).absolutePath + "";
    }
    cd(payload) {
        console.log("1", this.currentpath);
        if (payload[1] === undefined) {
            this.currentpath = "/";
            console.log("2", this.currentpath);
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
            console.log("3", this.currentpath);
        }
        else if (fs.isOverlap(payload[1], this.currentpath) == false) {
            if (this.currentpath === "/") {
                this.currentpath += ("" + payload[1]);
            }
            else {
                this.currentpath += ("/" + payload[1]);
            }
            console.log("4", this.currentpath);
        }
        else if (fs.findDirectory(payload[1]) == true) {
            this.currentpath = payload[1];
            console.log("5", this.currentpath);
        }
        else {
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
                    }
                    else {
                        fs.deleteDirectory(temp += ("/" + payload[1]));
                    }
                }
            }
        }
        return " ";
    }
    mkdir(payload) {
        let temp = this.currentpath;
        temp += ("/" + payload[1]);
        fs.createDirectory(temp);
        return " ";
    }
    rmdir(payload) {
        let temp = this.currentpath;
        temp += ("/" + payload[1]);
        fs.deleteDirectory(temp);
        return " ";
    }
}
exports.commends = commends;
//# sourceMappingURL=commends.js.map
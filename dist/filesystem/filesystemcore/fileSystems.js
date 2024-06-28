"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystem = void 0;
class TreeNode {
    constructor(name, type) {
        this.name = name;
        this.type = type;
        this.children = [];
    }
    addChild(child) {
        this.children.push(child);
    }
    removeChild(childName) {
        this.children = this.children.filter(child => child.name !== childName);
    }
}
class FileSystem {
    constructor() {
        this.root = new TreeNode("/", "directory");
    }
    createFile(path) {
        const segments = path.split('/');
        let current = this.root;
        for (let i = 1; i < segments.length - 1; i++) {
            const segment = segments[i];
            let found = false;
            for (const child of current.children) {
                if (child.name === segment && child.type === 'directory') {
                    current = child;
                    found = true;
                    break;
                }
            }
            if (!found) {
                throw new Error(`Invalid path: ${path}`);
            }
        }
        const filename = segments[segments.length - 1];
        const fileNode = new TreeNode(filename, 'file');
        current.addChild(fileNode);
    }
    createDirectory(path) {
        const segments = path.split('/');
        let current = this.root;
        for (let i = 1; i < segments.length; i++) {
            const segment = segments[i];
            let found = false;
            for (const child of current.children) {
                if (child.name === segment && child.type === 'directory') {
                    current = child;
                    found = true;
                    break;
                }
            }
            if (!found) {
                const directoryNode = new TreeNode(segment, 'directory');
                current.addChild(directoryNode);
                current = directoryNode;
            }
        }
    }
    deleteFile(path) {
        const segments = path.split('/');
        const filename = segments[segments.length - 1];
        let current = this.root;
        for (let i = 1; i < segments.length - 1; i++) {
            const segment = segments[i];
            let found = false;
            for (const child of current.children) {
                if (child.name === segment && child.type === 'directory') {
                    current = child;
                    found = true;
                    break;
                }
            }
            if (!found) {
                throw new Error(`Invalid path: ${path}`);
            }
        }
        current.removeChild(filename);
    }
    deleteDirectory(path) {
        const segments = path.split('/');
        const dirname = segments[segments.length - 1];
        let current = this.root;
        for (let i = 1; i < segments.length - 1; i++) {
            const segment = segments[i];
            let found = false;
            for (const child of current.children) {
                if (child.name === segment && child.type === 'directory') {
                    current = child;
                    found = true;
                    break;
                }
            }
            if (!found) {
                throw new Error(`Invalid path: ${path}`);
            }
        }
        current.removeChild(dirname);
    }
    printFileSystem() {
        this._traverseFileSystem(this.root, '');
    }
    _traverseFileSystem(node, indent) {
        console.log(indent + node.name);
        for (const child of node.children) {
            this._traverseFileSystem(child, indent + '  ');
        }
    }
    stringFileSystem() {
        this._traverseFileSystem_s(this.root, "");
        return this.result;
    }
    _traverseFileSystem_s(node, path) {
        if (path != "") {
            this.result.push(path);
        }
        for (let child of node.children) {
            let newPath = `${path}/${child.name}`;
            this._traverseFileSystem_s(child, newPath);
        }
    }
    getPathInfo(path) {
        const segments = path.split('/');
        let current = this.root;
        let absolutePath = '/';
        let relativePath = '';
        let files = [];
        let filestype = [];
        if (path === '/') {
            relativePath = '/';
        }
        else {
            for (let i = 1; i < segments.length; i++) {
                const segment = segments[i];
                let found = false;
                for (const child of current.children) {
                    if (child.name === segment && child.type === 'directory') {
                        current = child;
                        absolutePath += `${segment}/`;
                        relativePath += `${segment}/`;
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    throw new Error(`Invalid path: ${path}`);
                }
            }
        }
        for (const child of current.children) {
            if (child.type === 'file' || child.type === 'directory') {
                files.push(child.name);
                filestype.push(child.type);
            }
        }
        return { absolutePath, relativePath, files, filestype };
    }
    isOverlap(filename, currentPath) {
        let found = false;
        let temp = this.getPathInfo(currentPath).files;
        for (const key in temp) {
            console.log(temp[key]);
            if (temp[key] == filename) {
                found = true;
            }
        }
        if (found) {
            return false;
        }
        else {
            return true;
        }
    }
    findDirectory(path) {
        const segments = path.split('/');
        const filename = segments[segments.length - 1];
        let current = this.root;
        let pathfinder = true;
        for (let i = 1; i < segments.length - 1; i++) {
            const segment = segments[i];
            let found = false;
            for (const child of current.children) {
                if (child.name === segment && child.type === 'directory') {
                    current = child;
                    found = true;
                    break;
                }
            }
            if (!found) {
                pathfinder = false;
            }
        }
        return pathfinder;
    }
}
exports.FileSystem = FileSystem;
//# sourceMappingURL=fileSystems.js.map
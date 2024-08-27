declare class TreeNode {
    name: any;
    type: any;
    children: any[];
    constructor(name: any, type: any);
    addChild(child: any): void;
    removeChild(childName: any): void;
}
declare class FileSystem {
    root: TreeNode;
    result: string[];
    constructor();
    createFile(path: any): void;
    createDirectory(path: any): void;
    deleteFile(path: any): void;
    deleteDirectory(path: any): void;
    printFileSystem(): void;
    _traverseFileSystem(node: any, indent: any): void;
    stringFileSystem(): string[];
    _traverseFileSystem_s(node: any, path: any): void;
    getPathInfo(path: any): {
        absolutePath: string;
        relativePath: string;
        files: any[];
        filestype: any[];
    };
    isOverlap(filename: any, currentPath: any): boolean;
    findDirectory(path: any): boolean;
}
export { FileSystem };

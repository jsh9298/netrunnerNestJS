export declare class NodeProgram {
    programName: string;
}
export declare class Reward {
    point: number;
    toolFile: string[];
}
export declare class TCPPort {
    servicePort: number;
    state: string;
}
export declare class UDPPort {
    servicePort: number;
    state: string;
}
export declare class NodePort {
    tcp: TCPPort[];
    udp: UDPPort[];
}
export declare class NodeFile {
    fileName: string;
    fileContent: string;
}
export declare class Node {
    nodeId: number;
    nodeMAC: string;
    nodeIP: string;
    nodePorts: NodePort;
    nodeDirectories: string[];
    nodePrograms: NodeProgram[];
    nodeFiles: NodeFile[];
}
export declare class MyNode {
    dirPath: string[];
    nodeFile: NodeFile[];
}
export declare class CorrectAnswer {
    myNode: MyNode;
}
export declare class Mission {
    missionID: number;
    scenario: string[];
    type: number[];
    correctAnswer: CorrectAnswer;
    node: Node;
    reward: Reward;
}

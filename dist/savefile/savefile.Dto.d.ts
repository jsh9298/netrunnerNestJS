declare class NodeProgram {
    programName: string;
}
declare class TCPPort {
    servicePort: number;
    state: string;
}
declare class UDPPort {
    servicePort: number;
    state: string;
}
declare class Reward {
    point: number;
    toolFile: string;
}
declare class NodePort {
    tcp: TCPPort;
    udp: UDPPort;
}
declare class NodeFile {
    fileName: string;
    fileContent: string;
}
declare class Node {
    nodeId: number;
    nodeMAC: string;
    nodeIP: string;
    nodePorts: NodePort;
    nodeDirectories: string[];
    nodePrograms: NodeProgram[];
    nodeFiles: NodeFile[];
}
declare class MyNode {
    dirPath: string;
    nodeFile: NodeFile;
}
declare class CorrectAnswer {
    myNode: MyNode;
}
export declare class Mission {
    missionId: number;
    scenario: string[];
    type: number[];
    correctAnswer: CorrectAnswer;
    node: Node;
    reward: Reward;
}
export {};

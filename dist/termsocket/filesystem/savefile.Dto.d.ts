declare class TCP {
    servicePort: number | null;
    state: string | null;
}
declare class UDP {
    servicePort: number | null;
    state: string | null;
}
declare class NodePort {
    TCP: TCP[];
    UDP: UDP[];
}
declare class NodeDirectorys {
    dirPath: string[];
}
declare class NodeProgram {
    programName: string[] | null;
}
declare class NodeFile {
    File_name: string | null;
    File_content: string | null;
}
declare class node {
    nodeId: string | null;
    nodeMAC: string | null;
    nodeIP: string | null;
    nodePort: NodePort;
    nodeDirectorys: NodeDirectorys;
    nodeProgram: NodeProgram;
    nodeFile: NodeFile[];
}
declare class Reward {
    point: number | null;
    toolFile: string | null;
}
export declare class Mission {
    missionID: string | null;
    scenario: string | null;
    type: string | null;
    correctAnswer: string | null;
    node: node[];
    reward: Reward;
}
export {};

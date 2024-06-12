class TCP {
    servicePort: number | null;
    state: string | null;
}

class UDP {
    servicePort: number | null;
    state: string | null;
}

class NodePort {
    TCP: TCP[];
    UDP: UDP[];
}

class NodeDirectorys {
    dirPath: string[];
}

class NodeProgram {
    programName: string[] | null;
}

class NodeFile {
    File_name: string | null;
    File_content: string | null;
}

class Node {
    nodeId: string | null;
    nodeMAC: string | null;
    nodeIP: string | null;
    nodePort: NodePort;
    nodeDirectorys: NodeDirectorys;
    nodeProgram: NodeProgram;
    nodeFile: NodeFile[];
}

class Reward {
    point: number | null;
    toolFile: string | null;
}

export class Mission {
    missionID: string | null;
    scenario: string | null;
    type: string | null;
    correctAnswer: string | null;
    nodes: Node[];
    reward: Reward;
}

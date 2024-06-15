export declare class Node {
    nodeID: string;
    nodeMAC: string;
    nodeIP: string;
    nodePort: {
        TCP: {
            servicePort: number;
            state: string;
        };
        UDP: {
            servicePort: number;
            state: string;
        };
    };
    nodeDirectorys: string[];
    nodeProgram: {
        programName: string;
    };
    nodeFile: {
        File_name: string;
        File_content: string;
    };
}
export declare class Mission {
    missionID: number;
    scenario: string;
    type: number[];
    correctAnswer: {
        myNode: {
            dirPath: string;
            nodeFile: {
                File_name: string;
                File_content: string;
            };
        };
    };
    node: Node;
    reward: {
        point: number;
        toolFile: string;
    };
}

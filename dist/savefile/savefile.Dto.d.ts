export declare class CorrectAnswerDTO {
    dirPath: string;
    File_name: string;
    File_content: string;
}
export declare class NodeDTO {
    nodeId: string;
    nodeMAC: string;
    nodeIP: string;
    nodeDirectorys: string[];
    nodeProgram: string[];
    nodeFiles: {
        File_name: string;
        File_content: string;
    }[];
    nodePorts: {
        TCP: number[];
        UDP: number[];
    };
}
export declare class RewardDTO {
    point: number;
    toolFile: string;
}
export declare class MissionDTO {
    scenario: string;
    type: string;
    correctAnswer: CorrectAnswerDTO;
    node: NodeDTO;
    reward: RewardDTO;
}

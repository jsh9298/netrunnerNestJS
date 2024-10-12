export declare class FileContentDTO {
    textData: string;
}
export declare class UserServiceDTO {
    userServiceName: string;
    userServicePort: number;
    userPortState: string;
}
export declare class UserProgramDTO {
    userProgramName: string[];
}
export declare class NodeDirectorysDTO {
    dirPath: string[];
}
export declare class ServiceDTO {
    serviceName: string;
    servicePort: number;
    portState: string;
}
export declare class TCPDTO {
    service: ServiceDTO[];
}
export declare class NodePortDTO {
    TCP: TCPDTO;
    UDP: TCPDTO;
}
export declare class UserDirectorysDTO {
    userDirPath: string[];
}
export declare class NodeProgramDTO {
    programName: string[];
}
export declare class RewardDTO {
    point: number;
    toolFile: string;
}
export declare class NodeFileDTO {
    File_name: string;
    File_content: FileContentDTO;
}
export declare class UserFileDTO {
    userFile_name: string;
    userFile_content: FileContentDTO;
}
export declare class NodeDTO {
    nodeMAC: string;
    nodeIP: string;
    nodePort: NodePortDTO;
    nodeDirectorys: NodeDirectorysDTO;
    nodeProgram: NodeProgramDTO;
    nodeFile: NodeFileDTO[];
}
export declare class UserDTO {
    userService: UserServiceDTO[];
}
export declare class UserPortDTO {
    userTCP: UserDTO;
    userUDP: UserDTO;
}
export declare class MyNodeDTO {
    dirPath: string;
    nodeFile: NodeFileDTO;
}
export declare class CorrectAnswerDTO {
    myNode: MyNodeDTO;
}
export declare class ScenarioDTO {
    story: string;
    target: string;
}
export declare class MissionDTO {
    scenario: ScenarioDTO;
    correctAnswer: CorrectAnswerDTO;
    node: NodeDTO[];
    reward: RewardDTO;
}
export declare class UserNodeDTO {
    userMAC: string;
    userIP: string;
    userPort: UserPortDTO;
    userDirectorys: UserDirectorysDTO;
    userFile: UserFileDTO[];
    userProgram: UserProgramDTO;
}
export declare class MissionsDTO {
    userNode: UserNodeDTO;
    mission: MissionDTO[];
}

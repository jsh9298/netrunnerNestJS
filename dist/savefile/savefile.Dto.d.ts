export declare class Welcome5 {
    missions: MissionsDTO;
}
export declare class MissionsDTO {
    userNode: UserNodeDTO;
    mission: MissionDTO[];
}
export declare class MissionDTO {
    scenario: string;
    correctAnswer: CorrectAnswerDTO;
    node: Node[];
    reward: RewardDTO;
}
export declare class CorrectAnswerDTO {
    myNode: MyNodeDTO;
}
export declare class MyNodeDTO {
    dirPath: string;
    nodeFile: NodeFileDTO;
}
export declare class NodeFileDTO {
    File_name: string;
    File_content: FileContentDTO;
}
export declare class FileContentDTO {
    __cdata: string;
}
export declare class NodeDTO {
    nodeMAC: string;
    nodeIP: string;
    nodePort: NodePortDTO;
    nodeDirectorys: NodeDirectorysDTO;
    nodeProgram: NodeProgramDTO;
    nodeFile: NodeFileDTO[];
}
export declare class NodeDirectorysDTO {
    dirPath: string[];
}
export declare class NodePortDTO {
    TCP: TCPDTO;
    UDP: TCPDTO;
}
export declare class TCPDTO {
    service: ServiceDTO[];
}
export declare class ServiceDTO {
    serviceName: string;
    servicePort: number;
    portState: string;
}
export declare class NodeProgramDTO {
    programName: string[];
}
export declare class RewardDTO {
    point: string;
    toolFile: string;
}
export declare class UserNodeDTO {
    userMAC: string;
    userIP: string;
    userPort: UserPortDTO;
    userDirectorys: UserDirectorysDTO;
    userFile: UserFileDTO[];
    userProgram: UserProgramDTO;
}
export declare class UserDirectorysDTO {
    userDirPath: string[];
}
export declare class UserFileDTO {
    userFile_name: string;
    userFile_content: FileContentDTO;
}
export declare class UserPortDTO {
    userTCP: UserDTO;
    userUDP: UserDTO;
}
export declare class UserDTO {
    userService: UserServiceDTO[];
}
export declare class UserServiceDTO {
    userServiceName: string;
    userServicePort: string;
    userPortState: string;
}
export declare class UserProgramDTO {
    userProgramName: string[];
}

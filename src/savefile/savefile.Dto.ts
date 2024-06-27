import { IsString, IsNotEmpty, IsNumber, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class CorrectAnswerDTO {
  dirPath: string;
  File_name: string;
  File_content: string;
}

export class service {
  serviceName: string;
  servicePort: number;
  portState: string;
}

export class NodeDTO {
  nodeMAC: string;
  nodeIP: string;
  nodeDirectorys: string[];
  nodeProgram: string[];
  nodeFiles: {
    File_name: string;
    File_content: string;
  }[];
  nodePorts: {
    TCP: service[];
    UDP: service[];
  };
}

export class RewardDTO {
  point: number;
  toolFile: string;
}

export class MissionDTO {
  scenario: string;
  correctAnswer: CorrectAnswerDTO;
  node: NodeDTO[];
  reward: RewardDTO;
}

export class UserServiceDTO {
  userServiceName: string;
  userServicePort: number;
  userPortstate: string;
}
export class UsernodeDTO {
  userMAC: string;
  userIP: string;
  userPort: {
    TCP: UserServiceDTO[];
    UDP: UserServiceDTO[];
  };
  userDirectorys: string[];
  userFile: {
    userFile_name: string;
    userFile_content: string;
  }[];
  userProgram: string[]
}

export class MissionsDTO {
  usernode: UsernodeDTO;
  mission: MissionDTO[];
}
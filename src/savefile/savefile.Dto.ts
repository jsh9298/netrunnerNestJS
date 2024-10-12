import { IsNotEmpty, IsString, IsNumber, IsArray, IsObject } from 'class-validator';

export class FileContentDTO {
  @IsString()
  textData: string;
}

export class UserServiceDTO {
  @IsString()
  userServiceName: string;

  @IsNumber()
  userServicePort: number;

  @IsString()
  userPortState: string;
}

export class UserProgramDTO {
  @IsArray()
  userProgramName: string[];
}

export class NodeDirectorysDTO {
  @IsArray()
  dirPath: string[];
}
export class ServiceDTO {
  @IsString()
  serviceName: string;

  @IsNumber()
  servicePort: number;

  @IsString()
  portState: string;
}

export class TCPDTO {
  @IsArray()
  service: ServiceDTO[];
}

export class NodePortDTO {
  @IsObject()
  TCP: TCPDTO;

  @IsObject()
  UDP: TCPDTO;
}

export class UserDirectorysDTO {
  @IsArray()
  userDirPath: string[];
}


export class NodeProgramDTO {
  @IsArray()
  programName: string[];
}

export class RewardDTO {
  @IsNumber()
  point: number;

  @IsString()
  toolFile: string;
}

export class NodeFileDTO {
  @IsString()
  File_name: string;

  @IsObject()
  File_content: FileContentDTO;
}

export class UserFileDTO {
  @IsString()
  userFile_name: string;

  @IsObject()
  userFile_content: FileContentDTO;
}

export class NodeDTO {
  @IsString()
  nodeMAC: string;

  @IsString()
  nodeIP: string;

  @IsObject()
  nodePort: NodePortDTO;

  @IsObject()
  nodeDirectorys: NodeDirectorysDTO;

  @IsObject()
  nodeProgram: NodeProgramDTO;

  @IsArray()
  nodeFile: NodeFileDTO[];
}
export class UserDTO {
  @IsArray()
  userService: UserServiceDTO[];
}

export class UserPortDTO {
  @IsObject()
  userTCP: UserDTO;

  @IsObject()
  userUDP: UserDTO;
}

export class MyNodeDTO {
  @IsString()
  dirPath: string;

  @IsObject()
  nodeFile: NodeFileDTO;
}

export class CorrectAnswerDTO {
  @IsObject()
  myNode: MyNodeDTO;
}

export class ScenarioDTO {
  @IsString()
  story: string;
  @IsString()
  target: string;
}

export class MissionDTO {
  @IsString()
  scenario: ScenarioDTO;

  @IsObject()
  correctAnswer: CorrectAnswerDTO;

  @IsArray()
  node: NodeDTO[];

  @IsObject()
  reward: RewardDTO;
}

export class UserNodeDTO {
  @IsString()
  userMAC: string;

  @IsString()
  userIP: string;

  @IsObject()
  userPort: UserPortDTO;

  @IsObject()
  userDirectorys: UserDirectorysDTO;

  @IsArray()
  userFile: UserFileDTO[];

  @IsObject()
  userProgram: UserProgramDTO;
}

export class MissionsDTO {
  @IsObject()
  userNode: UserNodeDTO;

  @IsArray()
  mission: MissionDTO[];
}

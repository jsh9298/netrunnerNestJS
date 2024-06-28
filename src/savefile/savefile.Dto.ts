import { IsNotEmpty, IsString, IsNumber, IsArray, IsObject } from 'class-validator';

// export class CorrectAnswerDTO {
//   @IsNotEmpty()
//   @IsString()
//   dirPath: string;

//   @IsNotEmpty()
//   @IsString()
//   File_name: string;

//   @IsNotEmpty()
//   @IsString()
//   File_content: string;
// }

// export class Service {
//   @IsNotEmpty()
//   @IsString()
//   serviceName: string;

//   @IsNotEmpty()
//   @IsNumber()
//   servicePort: number;

//   @IsNotEmpty()
//   @IsString()
//   portState: string;
// }
// export class DirPathDTO {
//   @IsNotEmpty()
//   @IsString()
//   dirPath: string[];
// }
// export class ProgramNameDTO {
//   @IsNotEmpty()
//   @IsString()
//   programName: string[];
// }
// export class NodeDTO {
//   @IsNotEmpty()
//   @IsString()
//   nodeMAC: string;

//   @IsNotEmpty()
//   @IsString()
//   nodeIP: string;

//   @IsNotEmpty()
//   @IsArray()
//   @IsString({ each: true })
//   nodeDirectorys: DirPathDTO;

//   @IsNotEmpty()
//   @IsArray()
//   @IsString({ each: true })
//   nodeProgram: ProgramNameDTO;

//   @IsNotEmpty()
//   @IsArray()
//   @IsObject({ each: true })
//   nodeFiles: {
//     File_name: string;
//     File_content: string;
//   }[];

//   @IsNotEmpty()
//   @IsObject()
//   nodePorts: {
//     TCP: Service[];
//     UDP: Service[];
//   };
// }

// export class RewardDTO {
//   @IsNotEmpty()
//   @IsNumber()
//   point: number;

//   @IsNotEmpty()
//   @IsString()
//   toolFile: string;
// }

// export class MissionDTO {
//   @IsNotEmpty()
//   @IsString()
//   scenario: string;

//   @IsNotEmpty()
//   @IsObject()
//   correctAnswer: CorrectAnswerDTO;

//   @IsNotEmpty()
//   @IsArray()
//   @IsObject({ each: true })
//   node: NodeDTO[];

//   @IsNotEmpty()
//   @IsObject()
//   reward: RewardDTO;
// }

// export class UserServiceDTO {
//   @IsNotEmpty()
//   @IsString()
//   userServiceName: string;

//   @IsNotEmpty()
//   @IsNumber()
//   userServicePort: number;

//   @IsNotEmpty()
//   @IsString()
//   userPortstate: string;
// }
// export class UserDirPathDTO {
//   @IsNotEmpty()
//   @IsString()
//   userDirPath: string[];
// }
// export class UserProgramNameDTO {
//   @IsNotEmpty()
//   @IsString()
//   userProgramName: string[];
// }
// export class UsernodeDTO {
//   @IsNotEmpty()
//   @IsString()
//   userMAC: string;

//   @IsNotEmpty()
//   @IsString()
//   userIP: string;

//   @IsNotEmpty()
//   @IsObject()
//   userPort: {
//     TCP: UserServiceDTO[];
//     UDP: UserServiceDTO[];
//   };

//   @IsNotEmpty()
//   @IsArray()
//   @IsString({ each: true })
//   userDirectorys: UserDirPathDTO;

//   @IsNotEmpty()
//   @IsArray()
//   @IsObject({ each: true })
//   userFile: {
//     userFile_name: string;
//     userFile_content: string;
//   }[];

//   @IsNotEmpty()
//   @IsArray()
//   @IsString({ each: true })
//   userProgram: UserProgramNameDTO;
// }

// export class MissionsDTO {
//   @IsNotEmpty()
//   @IsObject()
//   usernode: UsernodeDTO;

//   @IsNotEmpty()
//   @IsArray()
//   @IsObject({ each: true })
//   mission: MissionDTO[];
// }


export class Welcome5 {
  missions: MissionsDTO;
}

export class MissionsDTO {
  userNode: UserNodeDTO;
  mission: MissionDTO[];
}

export class MissionDTO {
  scenario: string;
  correctAnswer: CorrectAnswerDTO;
  node: Node[];
  reward: RewardDTO;
}

export class CorrectAnswerDTO {
  myNode: MyNodeDTO;
}

export class MyNodeDTO {
  dirPath: string;
  nodeFile: NodeFileDTO;
}

export class NodeFileDTO {
  File_name: string;
  File_content: FileContentDTO;
}

export class FileContentDTO {
  __cdata: string;
}

export class NodeDTO {
  nodeMAC: string;
  nodeIP: string;
  nodePort: NodePortDTO;
  nodeDirectorys: NodeDirectorysDTO;
  nodeProgram: NodeProgramDTO;
  nodeFile: NodeFileDTO[];
}

export class NodeDirectorysDTO {
  dirPath: string[];
}

export class NodePortDTO {
  TCP: TCPDTO;
  UDP: TCPDTO;
}

export class TCPDTO {
  service: ServiceDTO[];
}

export class ServiceDTO {
  serviceName: string;
  servicePort: number;
  portState: string;
}

export class NodeProgramDTO {
  programName: string[];
}

export class RewardDTO {
  point: string;
  toolFile: string;
}

export class UserNodeDTO {
  userMAC: string;
  userIP: string;
  userPort: UserPortDTO;
  userDirectorys: UserDirectorysDTO;
  userFile: UserFileDTO[];
  userProgram: UserProgramDTO;
}

export class UserDirectorysDTO {
  userDirPath: string[];
}

export class UserFileDTO {
  userFile_name: string;
  userFile_content: FileContentDTO;
}

export class UserPortDTO {
  userTCP: UserDTO;
  userUDP: UserDTO;
}

export class UserDTO {
  userService: UserServiceDTO[];
}

export class UserServiceDTO {
  userServiceName: string;
  userServicePort: string;
  userPortState: string;
}

export class UserProgramDTO {
  userProgramName: string[];
}

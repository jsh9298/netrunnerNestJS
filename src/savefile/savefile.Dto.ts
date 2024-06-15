import { IsArray, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';

class MissionType {
  static readonly SCANNING = 1;
  static readonly DETECTED_SPECIFIED_PORT = 2;
  static readonly EXECUTE_CODE = 3;
  static readonly PROXY_FIREWALL = 4;
  static readonly MONITORING = 5;
  static readonly CODE_INJECTION = 6;
  static readonly FILE_TRANSFER = 7;
}

export class Mission {
  @IsNumber()
  missionId: number;

  @IsArray()
  @IsString({ each: true })
  scenario: string[];

  @IsArray()
  @IsEnum(MissionType, { each: true })
  type: number[];

  @ValidateNested()
  correctAnswer: CorrectAnswer;

  @ValidateNested()
  node: Node;

  @ValidateNested()
  reward: Reward;
}

class CorrectAnswer {
  @ValidateNested()
  myNode: MyNode;
}

class MyNode {
  @IsString()
  dirPath: string;

  @ValidateNested()
  nodeFile: NodeFile;
}

class NodeFile {
  @IsString()
  fileName: string;

  @IsString()
  fileContent: string;
}

class Node {
  @IsNumber()
  nodeId: number;

  @IsString()
  nodeMAC: string;

  @IsString()
  nodeIP: string;

  @ValidateNested()
  nodePorts: NodePort;

  @IsArray()
  @IsString({ each: true })
  nodeDirectories: string[];

  @ValidateNested({ each: true })
  nodePrograms: NodeProgram[];

  @ValidateNested({ each: true })
  nodeFiles: NodeFile[];
}

class NodePort {
  @ValidateNested()
  tcp: TCPPort;

  @ValidateNested()
  udp: UDPPort;
}

class TCPPort {
  @IsNumber()
  servicePort: number;

  @IsString()
  state: string;
}

class UDPPort {
  @IsNumber()
  servicePort: number;

  @IsString()
  state: string;
}

class NodeProgram {
  @IsString()
  programName: string;
}

class Reward {
  @IsNumber()
  point: number;

  @IsString()
  toolFile: string;
}

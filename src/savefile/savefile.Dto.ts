import { IsArray, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';

export class NodeProgram {
  @IsString()
  programName: string;
}
export class TCPPort {
  @IsNumber()
  servicePort: number;

  @IsString()
  state: string;
}

export class UDPPort {
  @IsNumber()
  servicePort: number;

  @IsString()
  state: string;
}

export class Reward {
  @IsNumber()
  point: number;

  @IsString()
  toolFile: string;
}
export class NodePort {
  @ValidateNested()
  tcp: TCPPort;

  @ValidateNested()
  udp: UDPPort;
}

export class NodeFile {
  @IsString()
  fileName: string;

  @IsString()
  fileContent: string;
}


export class Node {
  @IsNumber()
  nodeId: number;

  @IsString()
  nodeMAC: string;

  @IsString()
  nodeIP: string;

  @ValidateNested()
  nodePorts: NodePort;

  @IsArray()
  nodeDirectories: string[];

  @ValidateNested()
  nodePrograms: NodeProgram[];

  @ValidateNested()
  nodeFiles: NodeFile[];
}

export class MyNode {
  @IsString()
  dirPath: string;

  @ValidateNested()
  nodeFile: NodeFile;
}
export class CorrectAnswer {
  @ValidateNested()
  myNode: MyNode;
}

export class Mission {
  @IsNumber()
  missionId: number;

  @IsArray()
  @IsString()
  scenario: string[];

  @IsArray()
  type: number[];

  @ValidateNested()
  correctAnswer: CorrectAnswer;

  @ValidateNested()
  node: Node;

  @ValidateNested()
  reward: Reward;
}
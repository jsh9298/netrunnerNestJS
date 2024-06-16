import { IsArray, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';

class NodeProgram {
  @IsString()
  programName: string;
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

class Reward {
  @IsNumber()
  point: number;

  @IsString()
  toolFile: string;
}
class NodePort {
  @ValidateNested()
  tcp: TCPPort;

  @ValidateNested()
  udp: UDPPort;
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

class MyNode {
  @IsString()
  dirPath: string;

  @ValidateNested()
  nodeFile: NodeFile;
}
class CorrectAnswer {
  @ValidateNested()
  myNode: MyNode;
}

class Mission {
  @IsNumber()
  missionId: number;

  @IsArray()
  @IsString({ each: true })
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
export class Missions{
  @ValidateNested()
  mission:Mission[];
}
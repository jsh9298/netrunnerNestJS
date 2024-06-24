import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
export class NodeProgram {
  @IsString()
  programName: string;
}

export class Reward {
  @IsNumber()
  point: number;

  @IsArray()
  @IsString({ each: true })
  toolFile: string[];
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

export class NodePort {
  @ValidateNested({ each: true })
  @Type(() => TCPPort)
  tcp: TCPPort[];

  @ValidateNested({ each: true })
  @Type(() => UDPPort)
  udp: UDPPort[];
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
  @Type(() => NodePort)
  nodePorts: NodePort;

  @IsArray()
  @IsString({ each: true })
  nodeDirectories: string[];

  @ValidateNested({ each: true })
  @Type(() => NodeProgram)
  nodePrograms: NodeProgram[];

  @ValidateNested({ each: true })
  @Type(() => NodeFile)
  nodeFiles: NodeFile[];
}

export class MyNode {
  @IsArray()
  @IsString({ each: true })
  dirPath: string[];

  @ValidateNested({ each: true })
  @Type(() => NodeFile)
  nodeFile: NodeFile[];
}
export class CorrectAnswer {
  @ValidateNested()
  @Type(() => MyNode)
  myNode: MyNode;
}
export class Mission {
  @IsNumber()
  missionID: number;

  @IsArray()
  @IsNotEmpty({ each: true })
  scenario: string[];

  @IsArray()
  @IsInt({ each: true })
  type: number[];

  @ValidateNested()
  @Type(() => CorrectAnswer)
  correctAnswer: CorrectAnswer;

  @ValidateNested()
  @Type(() => Node)
  node: Node;

  @ValidateNested()
  @Type(() => Reward)
  reward: Reward;
}











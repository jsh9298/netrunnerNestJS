import { IsString, IsNotEmpty, IsNumber, ArrayNotEmpty, ArrayUnique } from 'class-validator';

export class CorrectAnswerDTO {
  @IsString()
  @IsNotEmpty()
  dirPath: string;

  @IsString()
  @IsNotEmpty()
  File_name: string;

  @IsString()
  @IsNotEmpty()
  File_content: string;
}

export class NodeDTO {
  @IsString()
  @IsNotEmpty()
  nodeId: string;

  @IsString()
  @IsNotEmpty()
  nodeMAC: string;

  @IsString()
  @IsNotEmpty()
  nodeIP: string;

  @ArrayNotEmpty()
  @ArrayUnique()
  nodeDirectorys: string[];

  @ArrayNotEmpty()
  @ArrayUnique()
  nodeProgram: string[];

  @ArrayNotEmpty()
  nodeFiles: {
    File_name: string;
    File_content: string;
  }[];

  nodePorts: {
    TCP: number[];
    UDP: number[];
  };
}

export class RewardDTO {
  @IsNumber()
  point: number;

  @IsString()
  @IsNotEmpty()
  toolFile: string;
}

export class MissionDTO {
  @IsString()
  @IsNotEmpty()
  scenario: string;

  @IsNumber()
  @IsNotEmpty()
  type: number[];

  correctAnswer: CorrectAnswerDTO;
  node: NodeDTO;
  reward: RewardDTO;
}
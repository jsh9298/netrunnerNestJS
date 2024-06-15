import { IsNotEmpty, IsNumber, IsArray, IsObject, IsString } from 'class-validator';

export class Node {
    @IsString()
    nodeID: string;
  
    @IsString()
    nodeMAC: string;
  
    @IsString()
    nodeIP: string;
  
    @IsObject()
    nodePort: {
      TCP: {
        servicePort: number;
        state: string;
      };
      UDP: {
        servicePort:number;
        state: string;
      };
    };
  
    @IsArray()
    @IsString({ each: true })
    nodeDirectorys: string[];
  
    @IsObject()
    nodeProgram: {
      programName: string;
    };
  
    @IsObject()
    nodeFile: {
      File_name: string;
      File_content: string;
    };
  }
  
export class Mission {
  @IsNumber()
  missionID: number;

  @IsString()
  scenario: string;

  @IsArray()
  @IsNumber()
  type: number[];

  @IsObject()
  correctAnswer: {
    myNode: {
      dirPath: string;
      nodeFile: {
        File_name: string;
        File_content: string;
      };
    };
  };

  node: Node;

  @IsObject()
  reward: {
    point: number;
    toolFile: string;
  };
}

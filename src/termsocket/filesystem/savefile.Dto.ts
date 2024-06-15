// class TCP {
//     servicePort: number | null;
//     state: string | null;
// }

// class UDP {
//     servicePort: number | null;
//     state: string | null;
// }

// class NodePort {
//     TCP: TCP[];
//     UDP: UDP[];
// }

// class NodeDirectorys {
//     dirPath: string[];
// }

// class NodeProgram {
//     programName: string[] | null;
// }

// class NodeFile {
//     File_name: string | null;
//     File_content: string | null;
// }

// class Node {
//     nodeId: string | null;
//     nodeMAC: string | null;
//     nodeIP: string | null;
//     nodePort: NodePort;
//     nodeDirectorys: NodeDirectorys;
//     nodeProgram: NodeProgram;
//     nodeFile: NodeFile[];
// }

// class Reward {
//     point: number | null;
//     toolFile: string | null;
// }

// export class Mission {
//     missionID: string | null;
//     scenario: string | null;
//     type: string | null;
//     correctAnswer: string | null;
//     nodes: Node[];
//     reward: Reward;
// }

export class Mission {
    missionID: number;
    scenario: string;
    type: number[];
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
    reward: {
      point: number;
      toolFile: string;
    };
  }
  
  class Node {
    nodeID: string;
    nodeMAC: string;
    nodeIP: string;
    nodePort: {
      TCP: {
        servicePort: number;
        state: string;
      };
      UDP: {
        servicePort: number;
        state: string;
      };
    };
    nodeDirectorys: string[];
    nodeProgram: {
      programName: string;
    };
    nodeFile: {
      File_name: string;
      File_content: string;
    };
  }
  
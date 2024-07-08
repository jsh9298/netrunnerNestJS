import { OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FilesystemService } from 'src/filesystem/filesystem.service';
export declare class TermsocketGateway implements OnGatewayConnection {
    private fileSystemService;
    [x: string]: any;
    private commandMap;
    constructor(fileSystemService: FilesystemService);
    server: Server;
    handleConnection(client: any, ...args: any[]): Promise<void>;
    handleJoin(client: any, data: {
        roomId: string;
    }): void;
    handleMessage(client: any, data: {
        roomId: string;
        payload: string;
    }): string;
    handleLeave(client: any, data: {
        roomId: string;
    }): void;
}

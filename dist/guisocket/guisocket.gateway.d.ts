import { OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FilesystemService } from 'src/filesystem/filesystem.service';
export declare class GuisocketGateway implements OnGatewayConnection {
    private fileSystemService;
    private commandMap;
    constructor(fileSystemService: FilesystemService);
    server: Server;
    handleConnection(client: any, ...args: any[]): void;
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

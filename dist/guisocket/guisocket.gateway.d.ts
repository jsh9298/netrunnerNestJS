import { OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { FilesystemService } from 'src/filesystem/filesystem.service';
export declare class GuisocketGateway implements OnGatewayConnection {
    private fileSystemService;
    [x: string]: any;
    private commandMap;
    constructor(fileSystemService: FilesystemService);
    server: Server;
    handleConnection(client: any, ...args: any[]): Promise<void>;
    handleJoin(client: any, data: {
        roomId: string;
    }): void;
    handleContent(client: any, data: {
        roomId: string;
        payload: string;
        context: string;
    }): void;
    handleMessage(client: any, data: {
        roomId: string;
        payload: string;
        savepoint: string;
    }): string;
    handleLeave(client: any, data: {
        roomId: string;
    }): void;
}

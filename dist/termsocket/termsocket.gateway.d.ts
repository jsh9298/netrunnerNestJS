import { OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class TermsocketGateway implements OnGatewayConnection {
    com: any;
    constructor();
    server: Server;
    handleConnection(client: any, ...args: any[]): void;
    handleJoin(client: any, data: {
        roomId: string;
    }): void;
    handleMessage(client: any, data: {
        roomId: string;
        payload: any;
    }): string;
    handleLeave(client: any, data: {
        roomId: string;
    }): void;
}

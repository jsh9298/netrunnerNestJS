import { OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
export declare class TermsocketGateway implements OnGatewayConnection {
    com: any;
    constructor();
    server: Server;
    handleConnection(client: any, ...args: any[]): void;
    handleMessage(client: any, payload: any): string;
}

import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { commends } from '../filesystem/commends';
import { FilesystemService } from 'src/filesystem/filesystem.service';

@WebSocketGateway({
  cors: true, namespace: 'gui'
})
export class GuisocketGateway implements OnGatewayConnection {
  [x: string]: any;
  private commandMap: Map<string, commends> = new Map();
  constructor(
    private fileSystemService: FilesystemService,
  ) {
  }
  @WebSocketServer()
  server: Server;

  async handleConnection(client: any, ...args: any[]) {
    try {
      const token = client.handshake?.query?.token;
      const payload = jwt.verify(token, config.get('jwt.secret'));
      client.user = payload;
      console.log("cl gui id:", client.user.userId);
      // this.fileSystemService.setFileSystem(client.user.userId);
      this.fileSystemService.initFs(client.user.userId, 0, `/game/${client.user.userId}`);
      this.commandMap.set(client.id, this.fileSystemService.setC(client.user.userId));

    } catch (error) {
      client.disconnect();
      console.error("gui Error:", error);
      return;
    }
  }
  @SubscribeMessage('join')
  handleJoin(client: any, data: { roomId: string }) {
    client.join(data.roomId);
    console.log("join gui:", data);
  }
  @SubscribeMessage('content')
  handleContent(client: any, data: { roomId: string, payload: string, context: string }): void {
    if (!client.user) {
      return;
    }
    const com = this.commandMap.get(client.id);
    console.log("com :", com);
    const response = data.payload.split(' ');
    console.log("data:", data);
    switch (response[0]) {
      case 'write':
        data.payload = com.write(data.payload, data.context);
        break;
    }
    this.server.to(data.roomId).emit('message', data.payload);
  }
  @SubscribeMessage('message')
  handleMessage(client: any, data: { roomId: string, payload: string }): string {
    // payload = "return of server";
    if (!client.user) {
      return;
    }
    const com = this.commandMap.get(client.id);
    console.log("com :", com);
    const response = data.payload.split(' ');
    console.log("data:", data);
    switch (response[0]) {
      case 'pwd':
        data.payload = com.pwd();
        break;
      case 'cd':
        data.payload = com.cd(response);
        break;
      case 'ls':
        data.payload = com.ls(response);
        break;
      case 'help':
        data.payload = com.help(response);
        break;
      case 'cp':
        data.payload = com.cp(response);
        break;
      case 'mv':
        data.payload = com.mv(response);
        break;
      case 'rm':
        data.payload = com.rm(response);
        break;
      case 'mkdir':
        data.payload = com.mkdir(response);
        break;
      case 'rmdir':
        data.payload = com.rmdir(response);
        break;
      case 'cat':
        data.payload = com.cat(response);
        break;
      default:
        data.payload = "Unkown commends";
        break;
    }
    this.server.to(data.roomId).emit('message', data.payload);
  }
  @SubscribeMessage('leave')
  handleLeave(client: any, data: { roomId: string }) {
    console.log("leave:", data);
    client.leave(data.roomId);
  }

}

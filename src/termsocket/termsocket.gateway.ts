import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { commends } from '../filesystem/commends';
import { FilesystemService } from 'src/filesystem/filesystem.service';

@WebSocketGateway({
  cors: true, namespace: 'term'
})
export class TermsocketGateway implements OnGatewayConnection {
  [x: string]: any;
  private commandMap: Map<string, commends> = new Map();
  constructor(
    private fileSystemService: FilesystemService,
  ) {

  }
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    try {
      const token = client.handshake?.query?.token;
      const payload = jwt.verify(token, config.get('jwt.secret'));
      client.user = payload;
      this.fileSystemService.initFs(client.user.userId, 0, `/game/${client.user.userId}`);
      this.commandMap.set(client.id, this.fileSystemService.setC(client.user.userId));

    } catch (error) {
      client.disconnect();
      console.error("term error:", error);
      return;
    }
  }
  @SubscribeMessage('join')
  handleJoin(client: any, data: { roomId: string }) {
    client.join(data.roomId);
    console.log("join:", data);
  }

  @SubscribeMessage('message')
  handleMessage(client: any, data: { roomId: string, payload: string }): string {
    // payload = "return of server";
    if (!client.user) {
      return;
    }
    const com = this.commandMap.get(client.id);
    const response = data.payload.split(' ');
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
      case 'touch':
        data.payload = com.touch(response);
        break;
      case 'vi':
        data.payload = com.vi(response);
        break;
      case 'ssh':
        data.payload = com.ssh(response);
        break;
      case 'scan':
        data.payload = com.scan(response);
        break;
      // case 'ps':
      //   payload = this.com.ps(payload);
      //     break;
      // case 'kill':
      //   payload = this.com.kill(payload);
      //     break;
      // case 'nmap':
      //   payload = this.com.nmap(payload);
      //     break;
      // case 'porthack':
      //   payload = this.com.porthack(payload);
      //     break;
      // case 'scp':
      //   payload = this.com.scp(payload);
      //     break;
      // case 'sshcrack':
      //   payload = this.com.sshcrack(payload);
      //     break;
      // case 'scan':
      //   payload = this.com.scan(payload);
      //     break;
      // case 'connect':
      //   payload = this.com.connect(payload);
      //     break;
      // case 'disconnect':
      //   payload = this.com.disconnect(payload);
      //     break;
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

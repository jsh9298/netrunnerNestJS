import { OnGatewayConnection, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import * as jwt from 'jsonwebtoken';
import * as config from 'config';
import { commends } from '../filesystem/commends';
import { FilesystemService } from 'src/filesystem/filesystem.service';
import { User } from 'src/auth/users/user.entity';

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
      const userId = client.user.userId;
      const user = await User.findOne({ where: { userId } });
      this.fileSystemService.initFs(userId, user.savepoint, `/game/${userId}`, user.username);
      this.commandMap.set(client.id, await this.fileSystemService.setC(client.user.userId));

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
    const response = data.payload.split(' ');
    switch (response[0]) {
      case 'write':
        com.write(response, data.context.toString());
        break;
    }
    // this.server.to(data.roomId).emit('content', data.payload);
  }
  @SubscribeMessage('message')
  handleMessage(client: any, data: { roomId: string, payload: string, savepoint: string }): string {
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
      case 'vi':
        data.payload = com.vi(response);
        break;
      case 'touch':
        data.payload = com.touch(response);
        break;
      case 'porthack':
        data.payload = com.porthack(response);
        break;
      case 'SSHcrack':
        data.payload = com.SSHcrack(response);
        break;
      case 'SMTPoverflow':
        data.payload = com.SMTPoverflow(response);
        break;
      case 'WebServerWorm':
        data.payload = com.WebServerWorm(response);
        break;
      case 'DECHead':
        data.payload = com.DECHead(response);
        break;
      case 'Decypher':
        data.payload = com.Decypher(response);
        break;
      default:
        data.payload = "Unkown command";
        break;
    }
    com.savepoint = parseInt(data.savepoint, 10);
    const payload = data.payload;
    this.server.to(data.roomId).emit('message', payload);
  }
  @SubscribeMessage('leave')
  handleLeave(client: any, data: { roomId: string }) {
    console.log("leave gui:", data);
    client.leave(data.roomId);
  }

}

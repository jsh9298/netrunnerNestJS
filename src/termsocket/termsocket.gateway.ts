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
  com: any;
  constructor(
    private fileSystemService:FilesystemService
  ) {
    this.com = fileSystemService.setC();
  }
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    try {
      const token = client.handshake?.query?.token;
      const payload = jwt.verify(token, config.get('jwt.secret'));
      client.user = payload;
    } catch (error) {
      client.disconnect();
      console.log("실패")
      return;
    }
  }

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    // payload = "return of server";
    if (!client.user) {
      return;
    }
    const response = payload.split(' ');
    console.log(response);
    switch (response[0]) {
      case 'pwd':
        payload = this.com.pwd();
        break;
      case 'cd':
        payload = this.com.cd(response);
        break;
      case 'ls':
        payload = this.com.ls(response);
        break;
      case 'help':
        payload = this.com.help(response);
        break;
      case 'cp':
        payload = this.com.cp(response);
        break;
      case 'mv':
        payload = this.com.mv(response);
        break;
      case 'rm':
        payload = this.com.rm(response);
        break;
      case 'mkdir':
        payload = this.com.mkdir(response);
        break;
      case 'rmdir':
        payload = this.com.rmdir(response);
        break;
      // case 'cat':
      // payload = this.com.cat(payload);
      // break;
      // case 'touch': 
      // payload = this.com.touch(payload);
      //     break;
      // case 'vi':
      //   payload = this.com.vi(payload);
      //     break;
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
        payload = "Unkown commends";
        break;
    }
    this.server.emit('message', payload);
  }
}

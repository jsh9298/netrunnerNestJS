import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { MissionsService } from './missions/missions.service';
import * as fs from 'fs';

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync('/etc/letsencrypt/live/netrunner.life/privkey.pem'),
  //   cert: fs.readFileSync('/etc/letsencrypt/live/netrunner.life/fullchain.pem'),
  // }
  // const app = await NestFactory.create(AppModule, { httpsOptions, });
  const app = await NestFactory.create(AppModule);
  const serve = app.get(MissionsService);
  await serve.setTool();
  app.enableCors();
  await app.listen(config.get('server'));
}
bootstrap();

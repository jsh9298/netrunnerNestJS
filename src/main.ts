import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as config from 'config';
import { MissionsService } from './missions/missions.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const serve = app.get(MissionsService);
  await serve.setTool();
  app.enableCors();
  await app.listen(config.get('server'));
}
bootstrap();

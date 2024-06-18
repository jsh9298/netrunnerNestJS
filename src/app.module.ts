import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';
import { BoardsModule } from './boards/boards.module';
import { EmailService } from './email/email.service';
import { EmailModule } from './email/email.module';
import { TermsocketGateway } from './termsocket/termsocket.gateway';
import { MissionsModule } from './missions/missions.module';
import { SavefileModule } from './savefile/savefile.module';
import { FilesystemModule } from './filesystem/filesystem.module';
import { commends } from './filesystem/commends';
import { FilesystemService } from './filesystem/filesystem.service';

@Module({
  imports: [AuthModule,TypeOrmModule.forRoot(typeORMConfig), BoardsModule, EmailModule, MissionsModule, SavefileModule, FilesystemModule],
  controllers: [AppController],
  providers: [AppService, EmailService, TermsocketGateway,commends,FilesystemService],
})
export class AppModule {}

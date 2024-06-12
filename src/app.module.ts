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
import { XmlService } from './termsocket/filesystem/savefile';


@Module({
  imports: [AuthModule,TypeOrmModule.forRoot(typeORMConfig), BoardsModule, EmailModule],
  controllers: [AppController],
  providers: [AppService, EmailService, TermsocketGateway,XmlService],
})
export class AppModule {}

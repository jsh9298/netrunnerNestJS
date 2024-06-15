import { Module } from '@nestjs/common';
import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';
import { XmlService } from 'src/termsocket/filesystem/savefile';

@Module({
  controllers: [MissionsController],
  providers: [MissionsService,XmlService]
})
export class MissionsModule {}

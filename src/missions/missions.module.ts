import { Module } from '@nestjs/common';
import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';
import { SaveFileService } from 'src/savefile/savefile.service';

@Module({
  controllers: [MissionsController],
  providers: [MissionsService,SaveFileService]
})
export class MissionsModule {}

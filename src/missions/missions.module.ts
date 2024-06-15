import { Module } from '@nestjs/common';
import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';
import { SaveFileService } from 'src/savefile/savefile.service';
import { SavefileModule } from 'src/savefile/savefile.module';

@Module({
  imports:[SavefileModule],
  controllers: [MissionsController],
  providers: [MissionsService,SaveFileService]
})
export class MissionsModule {}

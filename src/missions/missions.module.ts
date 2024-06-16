import { Module } from '@nestjs/common';
import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';
import { SaveFileService } from 'src/savefile/savefile.service';
import { SavefileModule } from 'src/savefile/savefile.module';
import { UserRepository } from 'src/auth/users/user.repository';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  imports:[SavefileModule,AuthModule],
  controllers: [MissionsController],
  providers: [MissionsService,SaveFileService,UserRepository]
})
export class MissionsModule {}

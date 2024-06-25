import { Module } from '@nestjs/common';
import { MissionsController } from './missions.controller';
import { MissionsService } from './missions.service';
import { SaveFileService } from 'src/savefile/savefile.service';
import { SavefileModule } from 'src/savefile/savefile.module';
import { UserRepository } from 'src/auth/users/user.repository';
import { AuthModule } from 'src/auth/auth.module';
import { ToolsRepository } from './tools/tool.repository';
import { TypeOrmExModule } from 'src/typeorm-ex/typeorm-ex.module';
import { Tool } from './tools/tool.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from 'src/configs/typeorm.config';


@Module({
  imports:[SavefileModule,AuthModule,TypeOrmModule.forRoot(typeORMConfig),TypeOrmModule.forFeature([Tool]),TypeOrmExModule.forCustomRepository([ToolsRepository])],
  controllers: [MissionsController],
  providers: [MissionsService,SaveFileService,UserRepository,ToolsRepository],
  exports:[ToolsRepository,MissionsService]
})
export class MissionsModule {}

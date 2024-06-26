import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './users/user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';
import { TypeOrmExModule } from 'src/typeorm-ex/typeorm-ex.module';
import { SaveFileService } from 'src/savefile/savefile.service';
import { SavefileModule } from 'src/savefile/savefile.module';
import { FilesystemModule } from 'src/filesystem/filesystem.module';
import { FilesystemService } from 'src/filesystem/filesystem.service';
import { commends } from 'src/filesystem/commends';

const jwtConfig = config.get('jwt');
@Module({
  imports:[
    PassportModule.register({defaultStrategy:'jwt'}),
    JwtModule.register({
      secret: jwtConfig.secret,
      signOptions:{
        expiresIn: jwtConfig.expiresIn,
      }
    })
    ,TypeOrmExModule.forCustomRepository([UserRepository]),SavefileModule,FilesystemModule
  ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy,SaveFileService,FilesystemService,commends],
  exports:[JwtStrategy,PassportModule]
})
export class AuthModule {}

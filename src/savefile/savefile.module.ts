import { Module } from '@nestjs/common';
import { SaveFileService } from './savefile.service';

import { UserRepository } from 'src/auth/users/user.repository';
import { Mission } from './savefile.Dto';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports:[AuthModule],
    providers: [SaveFileService,UserRepository],
    exports: [SaveFileService]
})
export class SavefileModule {}

import { Module } from '@nestjs/common';
import { SaveFileService } from './savefile.service';

import { UserRepository } from 'src/auth/users/user.repository';

@Module({
    providers: [SaveFileService,UserRepository],
    exports: [SaveFileService, UserRepository],

})
export class SavefileModule {}

import { Module, forwardRef } from '@nestjs/common';
import { SaveFileService } from './savefile.service';

import { UserRepository } from 'src/auth/users/user.repository';
import { Missions } from './savefile.Dto';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports:[forwardRef(() => AuthModule)
    ],
    providers: [SaveFileService],
    exports: [SaveFileService]
})
export class SavefileModule {}

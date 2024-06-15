import { Module } from '@nestjs/common';
import { SaveFileService } from './savefile.service';
import { TypeOrmExModule } from 'src/typeorm-ex/typeorm-ex.module';
import { UserRepository } from 'src/auth/users/user.repository';

@Module({
    imports:[
        TypeOrmExModule.forCustomRepository([UserRepository])
      ],
    providers: [SaveFileService]
})
export class SavefileModule {}

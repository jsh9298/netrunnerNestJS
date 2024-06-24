import { Module } from '@nestjs/common';
import { FilesystemService } from './filesystem.service';
import { SaveFileService } from 'src/savefile/savefile.service';
import { SavefileModule } from 'src/savefile/savefile.module';
import { FilesystemController } from './filesystem.controller';
import { commends } from './commends';


@Module({
    imports:[SavefileModule],
  providers: [FilesystemService,SaveFileService,commends],
  controllers: [FilesystemController]
})
export class FilesystemModule {}

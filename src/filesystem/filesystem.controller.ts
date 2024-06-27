import { Controller, Post, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { FilesystemService } from './filesystem.service';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/users/user.entity';

@Controller('filesystem')
export class FilesystemController {
    constructor(
        private fileSystemService: FilesystemService
    ) { }
    @Post(":id")
    @UseGuards(AuthGuard('jwt'))
    getSys(@GetUser() user: User, @Param('id', ParseIntPipe) id: number) {
        return this.fileSystemService.getSys(user, id);
    }
}

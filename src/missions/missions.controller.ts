import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/users/user.entity';
import { MissionsService } from './missions.service';
import { AuthGuard } from '@nestjs/passport';
import { Mission } from 'src/savefile/savefile.Dto';

@Controller('missions')
export class MissionsController {
    constructor(
        private missionsService:MissionsService,
    ){}
    @Get('/:missionid')
    @UseGuards(AuthGuard('jwt'))
    async getMisson(
        @Param('missionid') id:string,
        @GetUser() user:User,
    ):Promise<Mission>{
        return await this.missionsService.getMissons(user,id);
    }
}

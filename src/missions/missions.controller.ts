import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/users/user.entity';
import { MissionsService } from './missions.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('missions')
export class MissionsController {
    constructor(
        private missionsService:MissionsService,
    ){}
    @Get("/:id")
    @UseGuards(AuthGuard('jwt'))
    async getMisson(
        @Param('id',ParseIntPipe) id:number,
        @GetUser() user: User,
    ){
        const result = await this.missionsService.getMissons(user);      
        return result.at(id);
    }    
}

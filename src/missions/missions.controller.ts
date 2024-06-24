import { Controller,Post, Get, Param, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/users/user.entity';
import { MissionsService } from './missions.service';
import { AuthGuard } from '@nestjs/passport';
import { Mission} from 'src/savefile/savefile.Dto';

@Controller('missions')
export class MissionsController {
    constructor(
        private missionsService:MissionsService,
    ){}
    @Post()
    @UseGuards(AuthGuard('jwt'))
    async getMisson(
        @GetUser() user: User,
    ): Promise<Mission | { error: string }> {
        return await this.missionsService.getMissons(user);
    }
    @Get("points/:userId") 
    getPoints(@Param('userId')id:string,@GetUser() user:User){
        if(user.userId === id){
            return user.point;
        }
    }
    @Get("/tools")
    getTools(){
        return "plz wait updates 😢";
    }
}

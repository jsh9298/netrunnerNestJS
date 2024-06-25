import { Controller,Post, Get, Param, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/users/user.entity';
import { MissionsService } from './missions.service';
import { AuthGuard } from '@nestjs/passport';
import { Mission} from 'src/savefile/savefile.Dto';
import { Tool } from './tools/tool.entity';

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
    @Post("points/:userId") 
    @UseGuards(AuthGuard('jwt'))
    getPoints(@Param('userId')id:string,@GetUser() user:User){
        if(user.userId === id){
            return user.point;
        }
    }
    @Get("/tools")
    async getTools():Promise<Tool[]>{
        return await this.missionsService.getTools();
    }
    @Post("/check:id")
    @UseGuards(AuthGuard('jwt'))
    checkIsclear(@GetUser() user: User,@Param('id')id:string){
    }
}
//체크버튼
import { Controller, Post, Get, Param, UseGuards, ParseIntPipe } from '@nestjs/common';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/users/user.entity';
import { MissionsService } from './missions.service';
import { AuthGuard } from '@nestjs/passport';
import { MissionDTO } from 'src/savefile/savefile.Dto';
import { Tool } from './tools/tool.entity';

@Controller('missions')
export class MissionsController {
    constructor(
        private missionsService: MissionsService,
    ) { }
    @Post("/:id")
    @UseGuards(AuthGuard('jwt'))
    async getMisson(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User,
    ) {
        const result = await this.missionsService.getMissons(user);
        return result.at(id);
    }
    @Post("points/:userId")
    @UseGuards(AuthGuard('jwt'))
    getPoints(@Param('userId') id: string, @GetUser() user: User) {
        if (user.userId === id) {
            return user.point;
        }
    }
    @Get("/tools")
    @UseGuards(AuthGuard('jwt'))
    async getTools(@GetUser() user: User) {
        return await this.missionsService.getTools(user);
    }
    @Post("/complete/:id")
    @UseGuards(AuthGuard('jwt'))
    checkIsclear(@GetUser() user: User, @Param('id') id: number): Promise<{ success: boolean, nextMissionId: number }> {
        return this.missionsService.checkClear(user, id);
    }
    @Post("/tool/:toolId")
    @UseGuards(AuthGuard('jwt'))
    buyTools(@GetUser() user: User, @Param('toolId') toolId: number): Promise<boolean> {
        return this.missionsService.buyTools(user, toolId);
    }
}
//체크버튼
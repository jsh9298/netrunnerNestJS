import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './users/user.entity';
import { SignInDto } from './dto/signin.dto';
import { changePass } from './dto/changePass.dto';
import { Profile } from './dto/profile.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService,
    ){}
    @Post('/signup')
    signUp(@Body() authCredentialsDto:AuthCredentialsDto):Promise<void>{
        return this.authService.signUp(authCredentialsDto);
    }
    @Post('/signin')
    signIn(@Body(ValidationPipe)signInDto:SignInDto):Promise<{accessToken:string}>{
        return this.authService.signin(signInDto);
    }
    @Patch('/changepass')
    changepass(
    @Body()changepass:changePass):Promise<void>{
        return this.authService.changePass(changepass);
    }
    
    @Post('/signout')
    // @UseGuards(AuthGuard())
    signout(@GetUser() user:User){
        console.log('req',user);
    }
    @Get('/:id')
    getProfile(@Param('id') id:string ):Promise<{userId:string,level:number,point:number}>{
        return this.authService.getProfile(id);   
   }
}

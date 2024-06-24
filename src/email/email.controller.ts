import { Body, Controller, Post } from '@nestjs/common';
import { EmailService } from './email.service';
import { sendDto } from './dto/send.dto';
import { checkDto } from './dto/check.dto';

@Controller('email')
export class EmailController {
    constructor(
        private emailService:EmailService,
    ){}
    @Post('/send')
    sendEmail(@Body() address:sendDto):Promise<void>{
        const {email} = address;
        return this.emailService.sendEmail(email,"NetRunner 이메일 인증");
    }
    @Post('/check')
    checkverfication(@Body() check:checkDto){
        const{code,email} = check;
        return this.emailService.checkVerification(code,email);
    }
    

}

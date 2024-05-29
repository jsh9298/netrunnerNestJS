import { Body, Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';
import { sendDto } from './dto/send.dto';
import { checkDto } from './dto/check.dto';

@Controller('email')
export class EmailController {
    constructor(
        private emailService:EmailService,
    ){}
    @Get('/send')
    sendEmail(@Body() address:sendDto):Promise<void>{
        const {email} = address;
        return this.emailService.sendEmail(email,"NetRunner 이메일 인증");
    }
    @Get('/check')
    checkverfication(@Body() check:checkDto){
        const{code,email} = check;
        return this.emailService.checkVerification(code,email);
    }
    

}

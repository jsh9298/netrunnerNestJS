import { Body, Controller, Get } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(
        private emailService:EmailService,
    ){}
    @Get('/send')
    sendEmail(@Body() address:string):Promise<void>{
        return this.emailService.sendEmail(address,"NetRunner 이메일 인증");
    }
    @Get('/check')
    checkverfication(@Body() code:string){
        return this.emailService.checkverfication(code);
    }

}

import { EmailService } from './email.service';
import { sendDto } from './dto/send.dto';
import { checkDto } from './dto/check.dto';
export declare class EmailController {
    private emailService;
    constructor(emailService: EmailService);
    sendEmail(address: sendDto): Promise<void>;
    checkverfication(check: checkDto): boolean;
}

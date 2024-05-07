import { EmailService } from './email.service';
export declare class EmailController {
    private emailService;
    constructor(emailService: EmailService);
    sendEmail(address: string): Promise<void>;
    checkverfication(code: string): boolean;
}

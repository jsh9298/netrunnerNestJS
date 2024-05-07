export declare class EmailService {
    private ses;
    private verificationCode;
    constructor();
    generateVerificationCode(): string;
    sendEmail(to: string, subject: string): Promise<void>;
    checkverfication(verificationCode: string): boolean;
}

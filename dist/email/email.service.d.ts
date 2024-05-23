export declare class EmailService {
    private sesClient;
    private verificationCode;
    constructor();
    generateVerificationCode(): string;
    sendEmail(to: string, subject: string): Promise<void>;
    checkVerification(verificationCode: string): boolean;
}

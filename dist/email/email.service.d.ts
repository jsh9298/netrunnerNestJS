export declare class EmailService {
    private sesClient;
    constructor();
    private emaildata;
    generateVerificationCode(): string;
    sourcemail: string;
    sendEmail(to: string, subject: string): Promise<void>;
    checkVerification(verificationCode: string, addr: string): boolean;
}

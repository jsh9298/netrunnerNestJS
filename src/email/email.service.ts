import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import * as config from 'config';

@Injectable()
export class EmailService {
  private sesClient: SESClient;
  private verificationCode: string;

  constructor() {
    this.sesClient = new SESClient({
      region: config.get('AWS.region'), // AWS SES가 활성화된 리전
      credentials: {
        accessKeyId: config.get('AWS.access_key'),
        secretAccessKey: config.get('AWS.secret_key'),
      },
    });
  }

  generateVerificationCode(): string {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  }

  async sendEmail(to: string, subject: string): Promise<void> {
    this.verificationCode = this.generateVerificationCode();
    const params = {
      Source: config.get('AWS.source'), // 검증된 발신자 이메일config.get('AWS.source')
      Destination: {
        ToAddresses: [to[0]], // 받는 사람의 이메일 주소
      },
      Message: {
        Subject: {
          Data: subject, // 이메일 제목
        },
        Body: {
          Html: {
            Data: `<h1>인증코드 테스트<h1><h3>인증번호 : ${this.verificationCode}</h3>`, // HTML 형식의 이메일 본문
          },
        },
      },
    };

    try {
      const command = new SendEmailCommand(params);
      await this.sesClient.send(command);
      console.log('이메일 전송 성공');
    } catch (err) {
      console.error('이메일 전송 실패', err);
    }
  }

  checkVerification(verificationCode: string): boolean {
    return verificationCode == this.verificationCode;
  }
}

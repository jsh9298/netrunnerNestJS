import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as config from 'config';

@Injectable()
export class EmailService {
  private ses: AWS.SES;
  private verificationCode:string;

  constructor() {
    AWS.config.update({
      accessKeyId : config.get('AWS.access_key'),
      secretAccessKey : config.get('AWS.secret_key'),
      region: config.get('AWS.region'), // AWS SES가 활성화된 리전
    });

    this.ses = new AWS.SES();
  }
  generateVerificationCode(): string {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    return code;
  }

  async sendEmail(to: string, subject: string): Promise<void> {
    this.verificationCode = this.generateVerificationCode();
    const params = {
      Source: config.get('AWS.source'), // 검증된 발신자 이메일
      Destination: {
        ToAddresses: [to],// 받는 사람의 이메일 주소. 배열 형태로 여러 명에게 동시에 이메일을 보낼 수 도 있습니다
      },
      Message: {
        Subject: {
          Data: subject, // 이메일 제목
        },
        Body: {
          Html: {
            Data: `<h1>인증코드 테스트<h1><h3>인증번호 : ${this.verificationCode}</h3>`,// HTML 형식의 이메일 본문. 검증 코드가 포함된 메세지나 사용자가 읽을 수 있는 양식을 포함할 수 있습니다.
          },
        },
      },
    };

    try {
      await this.ses.sendEmail(params).promise();
      console.log('이메일 전송 성공');
    } catch (err) {
      console.error('이메일 전송 실패', err);
    }
  }

  checkverfication(verificationCode:string){
    if(verificationCode === this.verificationCode){
      return true;
    }
    return false;
  }

}

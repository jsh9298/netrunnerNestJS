"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
const config = require("config");
let EmailService = class EmailService {
    constructor() {
        AWS.config.update({
            accessKeyId: config.get('AWS.access_key'),
            secretAccessKey: config.get('AWS.secret_key'),
            region: config.get('AWS.region'),
        });
        this.ses = new AWS.SES();
    }
    generateVerificationCode() {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    }
    async sendEmail(to, subject) {
        this.verificationCode = this.generateVerificationCode();
        const params = {
            Source: config.get('AWS.source'),
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Subject: {
                    Data: subject,
                },
                Body: {
                    Html: {
                        Data: `<h1>인증코드 테스트<h1><h3>인증번호 : ${this.verificationCode}</h3>`,
                    },
                },
            },
        };
        try {
            await this.ses.sendEmail(params).promise();
            console.log('이메일 전송 성공');
        }
        catch (err) {
            console.error('이메일 전송 실패', err);
        }
    }
    checkverfication(verificationCode) {
        if (verificationCode === this.verificationCode) {
            return true;
        }
        return false;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map
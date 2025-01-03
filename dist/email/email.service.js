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
const client_ses_1 = require("@aws-sdk/client-ses");
const config = require("config");
let EmailService = class EmailService {
    constructor() {
        this.emaildata = {
            email: "",
            code: ""
        };
        this.sourcemail = config.get('AWS.source');
        this.sesClient = new client_ses_1.SESClient({
            region: config.get('AWS.region'),
            credentials: {
                accessKeyId: config.get('AWS.access_key'),
                secretAccessKey: config.get('AWS.secret_key'),
            },
        });
    }
    generateVerificationCode() {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        return code;
    }
    async sendEmail(to, subject) {
        const verificationCode = this.generateVerificationCode();
        const params = {
            Source: this.sourcemail,
            Destination: {
                ToAddresses: [to],
            },
            Message: {
                Subject: {
                    Data: subject,
                },
                Body: {
                    Html: {
                        Data: `<h1>Netrunner 인증코드 입니다. <h1><h3>인증번호 : ${verificationCode}</h3>`,
                    },
                },
            },
        };
        try {
            const command = new client_ses_1.SendEmailCommand(params);
            await this.sesClient.send(command);
            console.log('이메일 전송 성공');
            this.emaildata = { email: to, code: verificationCode };
        }
        catch (err) {
            console.error('이메일 전송 실패', err);
        }
    }
    checkVerification(verificationCode, addr) {
        return verificationCode === this.emaildata.code && addr === this.emaildata.email;
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
//# sourceMappingURL=email.service.js.map
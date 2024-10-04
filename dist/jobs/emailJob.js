"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailJob = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.sendEmailJob = {
    id: 'email-001',
    name: 'SendEmail',
    weight: 5,
    createdAt: new Date(),
    execute: (_a) => __awaiter(void 0, [_a], void 0, function* ({ fromEmail, toEmail, subject, text, html, config }) {
        try {
            let transporter;
            if (config.serviceOptions) {
                const { service, user, pass } = config.serviceOptions;
                transporter = nodemailer_1.default.createTransport({
                    service: service,
                    auth: {
                        user: user,
                        pass: pass,
                    },
                });
            }
            else if (config.smtpOptions) {
                const { host, port, secure, user, pass } = config.smtpOptions;
                transporter = nodemailer_1.default.createTransport({
                    host: host,
                    port: port,
                    secure: secure,
                    auth: {
                        user: user,
                        pass: pass,
                    },
                });
            }
            else {
                throw new Error('No valid email configuration provided.');
            }
            const mailOptions = {
                from: fromEmail,
                to: toEmail,
                subject: subject,
                text: text,
                html: html || '',
            };
            yield transporter.sendMail(mailOptions);
            console.log(`Email sent successfully to ${toEmail} from ${fromEmail}`);
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(`Failed to send email: ${error.message}`);
            }
            else {
                console.error('Failed to send email: Unknown error');
            }
        }
    }),
};

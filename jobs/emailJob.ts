import nodemailer from 'nodemailer';
import { Job } from '../utils/jobQueue';


interface ServiceEmailOptions {
  service: 'gmail' | 'sendgrid' | 'mailgun';
  user: string;
  pass: string;
}

interface SmtpEmailOptions {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
}

type EmailConfig = { serviceOptions?: ServiceEmailOptions; smtpOptions?: SmtpEmailOptions };

interface EmailJobParams {
  fromEmail: string;
  toEmail: string;
  subject: string;
  text: string;
  html?: string;
  config: EmailConfig;
}

export const sendEmailJob: Job<EmailJobParams> = {
  id: 'email-001',
  name: 'SendEmail',
  weight: 5,
  createdAt: new Date(),
  execute: async ({ fromEmail, toEmail, subject, text, html, config }: EmailJobParams) => {
    try {
      let transporter;

      if (config.serviceOptions) {
        const { service, user, pass } = config.serviceOptions;
        transporter = nodemailer.createTransport({
          service: service,
          auth: {
            user: user,
            pass: pass,
          },
        });
      } else if (config.smtpOptions) {
        const { host, port, secure, user, pass } = config.smtpOptions;
        transporter = nodemailer.createTransport({
          host: host,
          port: port,
          secure: secure,
          auth: {
            user: user,
            pass: pass,
          },
        });
      } else {
        throw new Error('No valid email configuration provided.');
      }

      const mailOptions = {
        from: fromEmail,
        to: toEmail,
        subject: subject,
        text: text,
        html: html || '',
      };

      await transporter.sendMail(mailOptions);
      console.log(`Email sent successfully to ${toEmail} from ${fromEmail}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Failed to send email: ${error.message}`);
      } else {
        console.error('Failed to send email: Unknown error');
      }
    }
  },
};

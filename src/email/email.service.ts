import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OnEvent } from '@nestjs/event-emitter';

export interface EmailData {
  email: string;
  name: string;
}

@Injectable()
export class EmailService {
  constructor(
    private readonly mailService: MailerService,
    private config: ConfigService,
  ) {}

  @OnEvent('user.welcome')
  async welcomeEmail(data: EmailData) {
    const { email, name } = data;

    const subject = `Welcome to Company ${name}`;

    try {
      await this.mailService.sendMail({
        from: this.config.get('MAIL_USER'),
        to: email,
        subject,
        template: 'welcome',
        context: {
          name,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
}

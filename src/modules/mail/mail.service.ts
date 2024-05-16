// Nest dependencies
import { Injectable, Logger } from '@nestjs/common';

// Other dependencies
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly transporter = nodemailer.createTransport({
    host: process.env.EMAIl_HOST,
    port: Number(process.env.EMAIl_PORT),
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIl_PASSWORD,
    },
  });

  async testSendMail() {
    try {
      // send mail with defined transport object
      const info = await this.transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: "bar@example.com, baz@example.com, hantv12a3@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
      });

      Logger.log("Message sent: %s", info.messageId);
      // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    } catch (error) {
      Logger.error(error);
      throw new Error(error.message);
    }
  }
}

import { MailAdapter, SendMailData } from "../mail-adapter";

import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "3b099c87544e48",
    pass: "96d2ff02b30c81",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "FidGet <oi@feedget.com.br>",
      to: "Gabriel Mello <contato@gabrielfemello.com.br>",
      subject: subject,
      html: body,
    });
  }
}

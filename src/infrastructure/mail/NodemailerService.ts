/* eslint-disable @typescript-eslint/no-non-null-assertion */
import nodemailer from 'nodemailer';
import { Environment } from '../../../config/constants/environment';
import { MailInterface } from '../../../config/MailInterface';
import Logger from '../logger/Logger';

export default class NodemailerService {
  private static instance: NodemailerService;

  private transporter: nodemailer.Transporter;

  //INSTANCE CREATE FOR MAIL
  static async getInstance() {
    if (!NodemailerService.instance) {
      NodemailerService.instance = new NodemailerService();
    }

    if (process.env.NODE_ENV === Environment.development)
      await NodemailerService.instance.createLocalConnection();
    else await NodemailerService.instance.createConnection();

    return NodemailerService.instance;
  }

  //CREATE CONNECTION FOR LOCAL
  async createLocalConnection() {
    const account = await nodemailer.createTestAccount();

    this.transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
  }

  //CREATE CONNECTION FOR LIVE
  async createConnection() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_SERVICE_HOST!,
      port: +process.env.SMTP_SERVICE_PORT!,
      secure: process.env.SMTP_SERVICE_TLS! === 'yes' ? true : false,
      auth: {
        user: process.env.SMTP_SERVICE_USERNAME!,
        pass: process.env.SMTP_SERVICE_PASSWORD!,
      },
    });
  }

  //SEND MAIL
  async sendMail(options: MailInterface) {
    return this.transporter
      .sendMail({
        from: `${process.env.SMTP_SERVICE_SENDER || options.from}`,
        to: options.to,
        cc: options.cc,
        bcc: options.bcc,
        subject: options.subject,
        text: options.text,
        html: options.html,
      })
      .then((info) => {
        Logger.info('Preview URL: ' + nodemailer.getTestMessageUrl(info));
        return info;
      });
  }

  //VERIFY CONNECTION
  async verifyConnection() {
    return this.transporter.verify();
  }

  //CREATE TRANSPOTER
  getTransporter() {
    return this.transporter;
  }
}

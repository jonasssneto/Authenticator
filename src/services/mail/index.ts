import nodemailer from "nodemailer";
import { CONFIG } from "../../config";
import BadRequestError from "../../errors/BadRequestError";

export default class MailService {
  private static instance: MailService;
  private transporter: nodemailer.Transporter;

  private constructor() {
    this.transporter = nodemailer.createTransport({
      host: CONFIG.SMTP_HOST,
      port: CONFIG.SMTP_PORT,
      secure: false,
      auth: {
        user: CONFIG.SMTP_USERNAME,
        pass: CONFIG.SMTP_PASSWORD,
      },
    });
  }

  public static getInstance(): MailService {
    if (!MailService.instance) {
      MailService.instance = new MailService();
    }
    return MailService.instance;
  }

  public async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string,
  ): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: CONFIG.SMTP_SENDER,
        to,
        subject,
        text,
        html,
      });
      console.log("Email sent successfully!");
    } catch (error) {
      console.log(error)
      throw new BadRequestError({ code: 400, message: "Email not sent"})
    }
  }
}

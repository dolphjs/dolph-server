import { DolphServiceHandler } from "@dolphjs/dolph/classes";
import { Dolph, TryCatchAsyncDec } from "@dolphjs/dolph/common";
import { InjectMongo } from "@dolphjs/dolph/decorators";
import { Model } from "mongoose";
import { NewsletterModel, INewsletter } from "./newsletter.model";
import { NewsLetterDto } from "./newsletter.dto";
import { sendSubscribedMail } from "@/shared/services/email.service";
import { SentMessageInfo } from "nodemailer";

@InjectMongo("newsletterModel", NewsletterModel)
export class NewsletterService extends DolphServiceHandler<Dolph> {
  newsletterModel!: Model<INewsletter>;

  constructor() {
    super("newsletterservice");
  }

  async addEmail(dto: NewsLetterDto): Promise<SentMessageInfo> {
    const user = await this.newsletterModel.findOne({ email: dto.email });

    if (!user) {
      await this.newsletterModel.create({
        email: dto.email,
        source: dto.source,
      });
    } else if (user.unsubscribed) {
      await this.newsletterModel.updateOne(
        { email: dto.email },
        { unsubscribed: false }
      );
    }

    return sendSubscribedMail(
      dto.email,
      "https://dolphjs.com",
      `https://api.dolphjs.com/newsletter/unsubscribe/${user.email}`
    );
  }

  async getSubscribedEmails() {
    return this.newsletterModel
      .find({ unsubscribed: false })
      .select(["createdAt", "email", "source"]);
  }

  async unsubscribe(email: string) {
    await this.newsletterModel.updateOne({ email }, { unsubscribed: true });
  }
}

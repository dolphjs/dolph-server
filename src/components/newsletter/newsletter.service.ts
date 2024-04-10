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

  @TryCatchAsyncDec
  async addEmail(dto: NewsLetterDto): Promise<SentMessageInfo> {
    await this.newsletterModel.create({ email: dto.email, source: dto.source });
    return sendSubscribedMail(dto.email, "https://dolph.io");
  }
}

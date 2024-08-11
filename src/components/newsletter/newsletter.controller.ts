import { DolphControllerHandler } from "@dolphjs/dolph/classes";
import {
  Dolph,
  SuccessResponse,
  DRequest,
  DResponse,
  InternalServerErrorException,
  TryCatchAsyncDec,
} from "@dolphjs/dolph/common";
import { Get, Post, Render, Route } from "@dolphjs/dolph/decorators";
import { NewsletterService } from "./newsletter.service";

@Route("newsletter")
export class NewsletterController extends DolphControllerHandler<Dolph> {
  private NewsletterService: NewsletterService;
  constructor() {
    super();
  }

  @Get("greet")
  async greet(req: DRequest, res: DResponse) {
    SuccessResponse({
      res,
      body: { message: "you've reached the newsletter endpoint." },
    });
  }

  @Get("")
  @TryCatchAsyncDec
  async getSubscribedMails(req: DRequest, res: DResponse) {
    const mails = await this.NewsletterService.getSubscribedEmails();

    SuccessResponse({ res, body: mails });
  }

  @Post()
  @TryCatchAsyncDec
  async add(req: DRequest, res: DResponse) {
    if (!(await this.NewsletterService.addEmail(req.body)))
      throw new InternalServerErrorException("cannot subscribe to newsletter");

    SuccessResponse({ res });
  }

  @Get("unsubscribe/:email")
  @Render("unsubscribed")
  async unsubscribe(req: DRequest, res: DResponse) {
    await this.NewsletterService.unsubscribe(req.params.email);
    return;
  }
}

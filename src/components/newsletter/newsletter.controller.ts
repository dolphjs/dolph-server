import { DolphControllerHandler } from "@dolphjs/dolph/classes";
import {
  Dolph,
  SuccessResponse,
  DRequest,
  DResponse,
  InternalServerErrorException,
} from "@dolphjs/dolph/common";
import { Get, Post, Route } from "@dolphjs/dolph/decorators";
import { NewsletterService } from "./newsletter.service";

@Route("newsletter")
export class NewsletterController extends DolphControllerHandler<Dolph> {
  constructor(
    private newsLetterService: NewsletterService = new NewsletterService()
  ) {
    super();
  }

  @Get("greet")
  async greet(req: DRequest, res: DResponse) {
    SuccessResponse({
      res,
      body: { message: "you've reached the newsletter endpoint." },
    });
  }

  @Post()
  async add(req: DRequest, res: DResponse) {
    if (this.newsLetterService.addEmail(req.body))
      throw new InternalServerErrorException("cannot add user to newsletter");

    SuccessResponse({ res });
  }
}

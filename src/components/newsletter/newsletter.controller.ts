import { DolphControllerHandler } from "@dolphjs/dolph/classes";
import {
  Dolph,
  SuccessResponse,
  DRequest,
  DResponse,
  InternalServerErrorException,
  TryCatchAsyncDec,
} from "@dolphjs/dolph/common";
import { Get, Post, Route } from "@dolphjs/dolph/decorators";
import { NewsletterService } from "./newsletter.service";

const newsLetterService = new NewsletterService();

@Route("newsletter")
export class NewsletterController extends DolphControllerHandler<Dolph> {
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

  @Post()
  @TryCatchAsyncDec
  async add(req: DRequest, res: DResponse) {
    if (!(await newsLetterService.addEmail(req.body)))
      throw new InternalServerErrorException("cannot add user to newsletter");

    SuccessResponse({ res });
  }
}

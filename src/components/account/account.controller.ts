import { DolphControllerHandler } from "@dolphjs/dolph/classes";
import {
  Dolph,
  SuccessResponse,
  DRequest,
  DResponse,
} from "@dolphjs/dolph/common";
import { Get, Post, Route } from "@dolphjs/dolph/decorators";

@Route("account")
export class AccountController extends DolphControllerHandler<Dolph> {
  constructor() {
    super();
  }

  @Get("greet")
  async greet(req: DRequest, res: DResponse) {
    SuccessResponse({
      res,
      body: { message: "you've reached the auth endpoint." },
    });
  }

  @Post("register")
  async createAccount(req: DRequest, res: DResponse) {
    SuccessResponse({
      res,
      body: { message: "", data: {} },
    });
  }
}

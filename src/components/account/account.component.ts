import { Component } from "@dolphjs/dolph/decorators";
import { AccountController } from "./account.controller";

@Component({ controllers: [AccountController] })
export class AccountComponent {}

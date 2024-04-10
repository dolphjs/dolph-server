import { Component } from "@dolphjs/dolph/decorators";
import { NewsletterController } from "./newsletter.controller";

@Component({ controllers: [NewsletterController] })
export class NewsletterComponent {}

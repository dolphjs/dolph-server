import { Component } from "@dolphjs/dolph/decorators";
import { NewsletterController } from "./newsletter.controller";
import { NewsletterService } from "./newsletter.service";

@Component({
  controllers: [NewsletterController],
  services: [NewsletterService],
})
export class NewsletterComponent {}

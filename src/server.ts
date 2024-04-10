import { DolphFactory } from "@dolphjs/dolph";
import { AccountComponent } from "./components/account/account.component";
import { NewsletterComponent } from "./components/newsletter/newsletter.component";

const dolph = new DolphFactory([AccountComponent, NewsletterComponent]);
dolph.start();

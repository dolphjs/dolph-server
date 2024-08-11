import { DolphFactory, middlewareRegistry, MVCAdapter } from "@dolphjs/dolph";
import { AccountComponent } from "./components/account/account.component";
import { NewsletterComponent } from "./components/newsletter/newsletter.component";
import path from "path";
import helmet from "helmet";

middlewareRegistry.register(helmet());

MVCAdapter.setViewEngine("pug");
MVCAdapter.setStaticAssets(path.join(__dirname, "public"));
MVCAdapter.setViewsDir(path.join(__dirname, "views"));

const dolph = new DolphFactory([AccountComponent, NewsletterComponent]);
dolph.start();

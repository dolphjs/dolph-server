import { DolphFactory, middlewareRegistry, MVCAdapter } from "@dolphjs/dolph";
import { AccountComponent } from "./components/account/account.component";
import { NewsletterComponent } from "./components/newsletter/newsletter.component";
import path from "path";
import helmet from "helmet";
import cors from "cors";

const corsOptions = {
  origin: ["http://localhost:4200", "https://dolphjs.com"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

middlewareRegistry.register(cors(corsOptions));
middlewareRegistry.register(helmet());

MVCAdapter.setViewEngine("pug");
MVCAdapter.setStaticAssets(path.join(__dirname, "public"));
MVCAdapter.setViewsDir(path.join(__dirname, "views"));

const dolph = new DolphFactory([AccountComponent, NewsletterComponent]);
dolph.start();

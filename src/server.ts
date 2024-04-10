import { DolphFactory } from "@dolphjs/dolph";
import { AccountComponent } from "./components/account/account.component";

const dolph = new DolphFactory([AccountComponent]);
dolph.start();

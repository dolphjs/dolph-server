import { DolphServiceHandler } from "@dolphjs/dolph/classes";
import { Dolph } from "@dolphjs/dolph/common";
import { InjectMongo } from "@dolphjs/dolph/decorators";
import { Model } from "mongoose";
import { UserModel, IUser } from "./account.model";
import { CreateNewUserDto } from "./account.dto";
import { serializeUser } from "./account.helper";

@InjectMongo("userModel", UserModel)
export class AccountService extends DolphServiceHandler<Dolph> {
  userModel!: Model<IUser>;

  constructor() {
    super("accountservice");
  }

  async saveNewUser(dto: CreateNewUserDto): Promise<IUser> {
    return this.userModel.create(dto);
  }

  async findUserByEmail(email: string): Promise<Object | null> {
    const user = await this.userModel.findOne({ email });
    return serializeUser(user);
  }
}

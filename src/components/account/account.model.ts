import { users } from "@/shared/constants/model_names.constants";
import { Schema, Document, model } from "mongoose";

export interface IAccount extends Document {}

export interface IUser extends Document {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  otherName: string;
  imgUrls: string[];
  age: number;
  city: string;
  state: string;
  address: string;
  country: string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    minlength: 5,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    minlength: 2,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
  },
  otherName: {
    type: String,
    required: false,
    minlength: 2,
  },
  age: {
    type: Number,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  imgUrls: [{ type: String }],
});

export const UserModel = model<IUser>(users, UserSchema);

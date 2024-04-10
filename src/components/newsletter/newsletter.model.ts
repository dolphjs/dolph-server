import { Schema, Document, model } from "mongoose";

export interface INewsletter extends Document {
  email: string;
  source: string;
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      minlength: 3,
    },
    source: {
      type: String,
      required: true,
      enum: ["docs", "waitlist", "website"],
    },
  },
  { timestamps: true }
);

export const NewsletterModel = model<INewsletter>(
  "newsletters",
  NewsletterSchema
);

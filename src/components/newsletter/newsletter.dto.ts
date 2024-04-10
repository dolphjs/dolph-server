import { IsEmail, IsIn, IsString } from "class-validator";

export class NewsLetterDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsIn(["waitlist", "docs", "website"])
  source: string;
}

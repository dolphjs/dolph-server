import { readFileSync } from "fs";
import { compile } from "handlebars";
import { resolve } from "path";
import mjml2Html from "mjml";
import * as nodemailer from "nodemailer";

export const sendMail = (
  to: string,
  subject: string,
  html: string
): Promise<nodemailer.SentMessageInfo> => {
  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE || "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: "dolph@dolphjs.io",
    to,
    subject,
    html,
  };

  return transporter.sendMail(mailOptions);
};

const convertFromMjmlToHtml = (path: string) => {
  const pathToMail = readFileSync(resolve(__dirname, path)).toString();
  return compile(mjml2Html(pathToMail).html);
};

export const sendSubscribedMail = async (to: string, url: string) => {
  return sendMail(
    to,
    "Welcome To The Dolphjs Community",
    convertFromMjmlToHtml("../../../templates/subscribed_mail.template.mjml")({
      url,
    })
  );
};

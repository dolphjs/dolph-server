import { ErrorException } from "@dolphjs/dolph/common";
import Joi from "joi";

const envSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .description("current app environment")
      .default("development"),
    MONGO_URI: Joi.string().description("mongodb connection string").required(),
  })
  .unknown();

const { value: envVars, error } = envSchema
  .prefs({ errors: { label: "key" } })
  .validate(process.env);

if (error)
  throw new ErrorException(`Configs Load Error: ${error.message}`, 500);

export const configs = {
  env: envVars.NODE_ENV,
  mongo: {
    connectionString: envVars.MONGO_URI,
  },
};

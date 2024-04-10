import { IUser } from "./account.model";

export const serializeUser = (user: IUser) => {
  const {
    firstName,
    lastName,
    otherName,
    email,
    age,
    address,
    city,
    state,
    country,
    imgUrls,
  } = user;

  return {
    firstName,
    lastName,
    otherName,
    email,
    age,
    address,
    city,
    state,
    country,
    imgUrls,
  };
};

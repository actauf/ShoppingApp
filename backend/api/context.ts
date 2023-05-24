import { User } from "../models/User";
import getUser from "../utils/getUser";
import { db } from "./db";
import { PrismaClient } from "@prisma/client";
require("dotenv").config(); // loading env variables

export interface Context {
  db: PrismaClient;
  authUser: User;
}

/* export const context = {
  db,
}; */

export const context = async ({ req }: { req: any }) => {
  const authUser = await getUser(
    req.get("Authorization"),
    process.env.JWT_SECRET,
    db
  );
  return {
    db,
    authUser,
  };
};

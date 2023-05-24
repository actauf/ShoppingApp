import { PrismaClient } from "@prisma/client";
import { User } from "../models/User";
import getUser from "../utils/getUser";

export interface Context {
  prisma: PrismaClient;
  currentUser: User;
}

/* export default async (req: any) => {
  const currentUser = await getUser(
    req.get("Authorization"),
    process.env.JWT_SECRET,
    PrismaClient
  );
  return {
    PrismaClient,
    currentUser,
  };
}; */

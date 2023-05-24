import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { db } from "../api/db";

export default async (
  authorization: any,
  secrets: any,
  prisma: PrismaClient
) => {
  const bearerLength = "Bearer ".length;
  if (authorization && authorization.length > bearerLength) {
    const token = authorization.slice(bearerLength);
    const res: { ok: any; result: any } = await new Promise((resolve) =>
      jwt.verify(token, secrets, (err: any, result: any) => {
        if (err) {
          resolve({
            ok: false,
            result: err,
          });
        } else {
          resolve({
            ok: true,
            result,
          });
        }
      })
    );

    if (res.ok) {
      const user = await db.users.findUnique({
        where: {
          id: res.result.id,
        },
      });
      return user;
    } else {
      console.error(res.result);
      return null;
    }
  }
  return null;
};

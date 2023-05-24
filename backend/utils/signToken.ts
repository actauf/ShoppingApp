import jwt from "jsonwebtoken";

export const signToken = (data: string) => {
  return jwt.sign(data, process.env.JWT_SECRET!);
};

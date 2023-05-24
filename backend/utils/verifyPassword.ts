import { compare } from "bcryptjs";

export const verifyPassword = async (hash: string, password: string) => {
  return await compare(hash, password);
};

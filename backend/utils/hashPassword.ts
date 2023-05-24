import { hash } from "bcryptjs"; // import bcrypt to hash passwords

export const hashPassword = async (password: string) => {
  return await hash(password, 10);
};

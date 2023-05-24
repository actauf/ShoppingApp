import {
  extendType,
  objectType,
  stringArg,
  nonNull,
  mutationField,
} from "nexus";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config(); // loading env variables

export const User = objectType({
  name: "User", // <- Name of your type
  definition(t) {
    t.string("id");
    t.string("username");
    t.string("email");
    t.string("password");
    t.string("address");
    t.string("token");
  },
});

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: "User",
      resolve(_root, _args, ctx) {
        return ctx.db.users.findMany();
      },
    });
  },
});

export const AuthUser = extendType({
  type: "Query",
  definition(t) {
    t.field("authUser", {
      type: "User",
      resolve: (_root, _args, ctx) => {
        return ctx.authUser;
      },
    });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUser", {
      type: "User",
      args: {
        // 1
        username: nonNull(stringArg()),
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        address: nonNull(stringArg()),
      },
      resolve(_root, args, ctx) {
        const user = {
          username: args.username,
          email: args.email,
          password: args.password,
          address: args.address,
        };
        return ctx.db.users.create({ data: user });
      },
    });
  },
});

export const userLogin = mutationField("userLogin", {
  type: "User",
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
  },
  resolve: async (_root, args, ctx, info) => {
    try {
      const { password, ...user } = await ctx.db.users.findUnique({
        where: {
          email: args.email,
        },
      });
      var validPass = await bcrypt.compareSync(args.password, password);
      if (validPass) {
        const token = jwt.sign(user, process.env.JWT_SECRET!);
        return {
          user: user,
          token,
        };
      }
      return null;
    } catch (e) {
      console.log(e);
    }
  },
});

export const userRegister = mutationField("userRegister", {
  type: "User",
  args: {
    email: nonNull(stringArg()),
    password: nonNull(stringArg()),
    username: nonNull(stringArg()),
    address: nonNull(stringArg()),
  },
  resolve: async (_root, args, ctx) => {
    try {
      const existingUser = await ctx.db.users.findUnique({
        where: {
          email: args.email,
        },
      });
      if (existingUser) {
        throw new Error("ERROR: email already used.");
      }
      var hash = bcrypt.hashSync(args.password, 10);

      const user = {
        username: args.username,
        email: args.email,
        password: hash,
        address: args.address,
      };

      const { password, ...register } = await ctx.db.users.create({
        data: user,
      });
      const token = jwt.sign(register, process.env.JWT_SECRET!);
      return {
        user: register,
        token: token,
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  },
});

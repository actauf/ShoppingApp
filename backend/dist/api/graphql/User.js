"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = exports.userLogin = exports.UserMutation = exports.AuthUser = exports.UserQuery = exports.User = void 0;
const nexus_1 = require("nexus");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config(); // loading env variables
exports.User = (0, nexus_1.objectType)({
    name: "User",
    definition(t) {
        t.string("id");
        t.string("username");
        t.string("email");
        t.string("password");
        t.string("address");
        t.string("token");
    },
});
exports.UserQuery = (0, nexus_1.extendType)({
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
exports.AuthUser = (0, nexus_1.extendType)({
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
exports.UserMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("createUser", {
            type: "User",
            args: {
                // 1
                username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
                address: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
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
exports.userLogin = (0, nexus_1.mutationField)("userLogin", {
    type: "User",
    args: {
        email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    resolve: (_root, args, ctx, info) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const _a = yield ctx.db.users.findUnique({
                where: {
                    email: args.email,
                },
            }), { password } = _a, user = __rest(_a, ["password"]);
            var validPass = yield bcryptjs_1.default.compareSync(args.password, password);
            if (validPass) {
                const token = jsonwebtoken_1.default.sign(user, process.env.JWT_SECRET);
                return {
                    user: user,
                    token,
                };
            }
            return null;
        }
        catch (e) {
            console.log(e);
        }
    }),
});
exports.userRegister = (0, nexus_1.mutationField)("userRegister", {
    type: "User",
    args: {
        email: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        password: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        username: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
        address: (0, nexus_1.nonNull)((0, nexus_1.stringArg)()),
    },
    resolve: (_root, args, ctx) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const existingUser = yield ctx.db.users.findUnique({
                where: {
                    email: args.email,
                },
            });
            if (existingUser) {
                throw new Error("ERROR: email already used.");
            }
            var hash = bcryptjs_1.default.hashSync(args.password, 10);
            const user = {
                username: args.username,
                email: args.email,
                password: hash,
                address: args.address,
            };
            const _b = yield ctx.db.users.create({
                data: user,
            }), { password } = _b, register = __rest(_b, ["password"]);
            const token = jsonwebtoken_1.default.sign(register, process.env.JWT_SECRET);
            return {
                user: register,
                token: token,
            };
        }
        catch (e) {
            console.log(e);
            return null;
        }
    }),
});

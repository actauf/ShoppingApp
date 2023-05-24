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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("../api/db");
exports.default = (authorization, secrets, prisma) => __awaiter(void 0, void 0, void 0, function* () {
    const bearerLength = "Bearer ".length;
    if (authorization && authorization.length > bearerLength) {
        const token = authorization.slice(bearerLength);
        const res = yield new Promise((resolve) => jsonwebtoken_1.default.verify(token, secrets, (err, result) => {
            if (err) {
                resolve({
                    ok: false,
                    result: err,
                });
            }
            else {
                resolve({
                    ok: true,
                    result,
                });
            }
        }));
        if (res.ok) {
            const user = yield db_1.db.users.findUnique({
                where: {
                    id: res.result.id,
                },
            });
            return user;
        }
        else {
            console.error(res.result);
            return null;
        }
    }
    return null;
});

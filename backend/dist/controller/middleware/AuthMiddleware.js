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
require("dotenv").config(); // loading env variables
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// MIDDLEWARE FOR AUTHORIZATION (MAKING SURE THEY ARE LOGGED IN)
const isLoggedIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if auth header exists
        if (req.headers.authorization) {
            // parse token from header
            const token = req.headers.authorization.split(" ")[1]; //split the header and get the token
            if (token) {
                const payload = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                if (payload) {
                    // store user data in request object
                    req.user = payload;
                    next();
                }
                else {
                    res.status(400).json({ error: "token verification failed" });
                }
            }
            else {
                res.status(400).json({ error: "malformed auth header" });
            }
        }
        else {
            res.status(400).json({ error: "No authorization header" });
        }
    }
    catch (error) {
        res.status(400).json({ error });
    }
});
// export custom middleware
module.exports = {
    isLoggedIn,
};

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
require("dotenv").config(); // load .env variables
const { Router } = require("express"); // import router from express
const User_1 = __importDefault(require("../dbModels/User")); // import user model
const bcrypt = require("bcryptjs"); // import bcrypt to hash passwords
const jwt = require("jsonwebtoken"); // import jwt to sign tokens
const router = Router(); // create router to create route bundle
//DESTRUCTURE ENV VARIABLES WITH DEFAULTS
const { JWT_SECRET } = process.env;
// Signup route to create a new user
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // hash the password
        req.body.password = yield bcrypt.hash(req.body.password, 10);
        // create a new user
        const user = yield User_1.default.create(req.body);
        // send new user as  : anyponse
        res.json(user);
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
// Login route to verify a user and get a token
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // check if the user exists
        const user = yield User_1.default.findOne({ username: req.body.username });
        if (user) {
            //check if password matches
            const result = yield bcrypt.compare(req.body.password, user.password);
            if (result) {
                // sign token and send it in response
                const token = yield jwt.sign({ username: user.username }, JWT_SECRET);
                res.json({ token });
            }
            else {
                res.status(400).json({ error: "password doesn't match" });
            }
        }
        else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    }
    catch (error) {
        res.status(400).json({ error });
    }
}));
module.exports = router;

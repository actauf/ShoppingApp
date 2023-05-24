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
exports.context = void 0;
const getUser_1 = __importDefault(require("../utils/getUser"));
const db_1 = require("./db");
require("dotenv").config(); // loading env variables
/* export const context = {
  db,
}; */
const context = ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
    const authUser = yield (0, getUser_1.default)(req.get("Authorization"), process.env.JWT_SECRET, db_1.db);
    return {
        db: db_1.db,
        authUser,
    };
});
exports.context = context;

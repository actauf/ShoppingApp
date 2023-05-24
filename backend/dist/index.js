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
const express_1 = __importDefault(require("express"));
const schema_1 = require("./api/schema");
const body_parser_1 = __importDefault(require("body-parser"));
const apollo_server_express_1 = require("apollo-server-express");
const context_1 = require("./api/context");
const http_1 = __importDefault(require("http"));
const port = 5000;
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.get("/", (req, res) => res.send("Hello from Express + TS!!!!!!!!!"));
app.get("/test", (req, res) => res.send("Hello from Test !!!!!!!!!"));
function startApolloServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const httpServer = http_1.default.createServer(app);
        const server = new apollo_server_express_1.ApolloServer({
            schema: schema_1.schema,
            context: context_1.context,
        });
        yield server.start();
        server.applyMiddleware({ app });
        yield new Promise((resolve) => httpServer.listen({ port: port }, resolve));
        console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
}
startApolloServer();

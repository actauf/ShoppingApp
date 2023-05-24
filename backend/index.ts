import express from "express";
import { schema } from "./api/schema";
import bodyParser from "body-parser";
import { ApolloServer } from "apollo-server-express";
import { Context, context } from "./api/context";
import http from "http";

const port = 5000;

const app = express();
app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello from Express + TS!!!!!!!!!"));
app.get("/test", (req, res) => res.send("Hello from Test !!!!!!!!!"));

async function startApolloServer() {
  const httpServer = http.createServer(app);
  const server = new ApolloServer<Context>({
    schema,
    context: context,
  });
  await server.start();
  server.applyMiddleware({ app });
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: port }, resolve)
  );
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`
  );
}

startApolloServer();

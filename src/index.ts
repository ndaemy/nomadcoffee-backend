import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import express from "express";
import schema from "./schema";

dotenv.config();

const port = Number(process.env.PORT) || 4000;

(async function () {
  const server = new ApolloServer({
    schema,
  });
  await server.start();
  const app = express();
  server.applyMiddleware({ app });
  await new Promise(r => app.listen({ port }, r as () => void));
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  );
})();

import { User } from "@prisma/client";
import { ApolloServer } from "apollo-server-express";
import dotenv from "dotenv";
import express from "express";
import schema from "./schema";
import { getUser } from "./users/users.utils";

dotenv.config();

const port = Number(process.env.PORT) || 4000;

export interface Context {
  currentUser: User | null;
}

(async function () {
  const server = new ApolloServer({
    schema,
    context: async ({ req }) => ({
      currentUser: await getUser(req.headers.authorization),
    }),
  });
  await server.start();
  const app = express();
  server.applyMiddleware({ app });
  await new Promise(r => app.listen({ port }, r as () => void));
  console.log(
    `🚀 Server ready at http://localhost:${port}${server.graphqlPath}`,
  );
})();

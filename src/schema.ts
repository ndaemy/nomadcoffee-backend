import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const typesArray = loadFilesSync(path.join(__dirname, "./**/*.typeDefs.[jt]s"));
const resolversArray = loadFilesSync(
  path.join(__dirname, "./**/*.resolvers.[jt]s"),
);

const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;

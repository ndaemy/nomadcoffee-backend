import { gql } from "apollo-server-express";

const usersTypeDefs = gql`
  type User {
    id: String!
    email: String!
    username: String!
    name: String!
    location: String!
    avatarURL: String!
    githubUsername: String!
    createdAt: String!
    updatedAt: String!
  }
`;

export default usersTypeDefs;
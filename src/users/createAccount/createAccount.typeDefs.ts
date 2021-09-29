import { gql } from "apollo-server-express";

const createAccountTypeDefs = gql`
  type CreateAccountResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      email: String!
      password: String!
      username: String!
      name: String!
      location: String!
      avatarURL: String!
      githubUsername: String!
    ): CreateAccountResult!
  }
`;

export default createAccountTypeDefs;

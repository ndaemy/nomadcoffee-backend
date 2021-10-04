import { gql } from "apollo-server-express";

const unfollowUserTypeDefs = gql`
  type UnfollowUserResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    unfollowUser(username: String!): UnfollowUserResult
  }
`;

export default unfollowUserTypeDefs;

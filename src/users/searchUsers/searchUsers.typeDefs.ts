import { gql } from "apollo-server-express";

const searchUsersTypeDefs = gql`
  type Query {
    searchUsers(keyword: String!): [User]
  }
`;

export default searchUsersTypeDefs;

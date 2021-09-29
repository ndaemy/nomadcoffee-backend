import { gql } from "apollo-server-express";

const seeProfileTypeDefs = gql`
  type Query {
    seeProfile(username: String!): User
  }
`;

export default seeProfileTypeDefs;

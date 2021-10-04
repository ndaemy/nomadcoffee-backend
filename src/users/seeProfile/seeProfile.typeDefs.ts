import { gql } from "apollo-server-express";

const seeProfileTypeDefs = gql`
  type Query {
    seeProfile(username: String!, page: Int): User
  }
`;

export default seeProfileTypeDefs;

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
    following: [User]
    followers: [User]
    totalFollowing: Int!
    totalFollowers: Int!
    isMe: Boolean!
    createdAt: String!
    updatedAt: String!
  }
`;

export default usersTypeDefs;

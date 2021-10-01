import { gql } from "apollo-server-express";

const editProfileTypeDefs = gql`
  type EditProfileResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editProfile(
      email: String
      password: String
      username: String
      name: String
      location: String
      avatarURL: String
      githubUsername: String
    ): EditProfileResult
  }
`;

export default editProfileTypeDefs;

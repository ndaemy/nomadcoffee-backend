import bcrypt from "bcrypt";
import { checkIsLoggedIn } from "../users.utils";
import client from "../../client";
import { Context } from "../../index";

interface editProfileArgs {
  email?: string;
  password?: string;
  username?: string;
  name?: string;
  location?: string;
  avatarURL?: string;
  githubUsername?: string;
}

const editProfileResolvers = {
  Mutation: {
    editProfile: checkIsLoggedIn(
      async (
        _,
        {
          email,
          password,
          username,
          name,
          location,
          avatarURL,
          githubUsername,
        }: editProfileArgs,
        { currentUser }: Context,
      ) => {
        try {
          const hashedPassword = password && (await bcrypt.hash(password, 10));
          await client.user.update({
            where: {
              id: currentUser!.id,
            },
            data: {
              email,
              password: hashedPassword,
              username,
              name,
              location,
              avatarURL,
              githubUsername,
            },
          });
          return {
            ok: true,
          };
        } catch {
          return {
            ok: false,
            error: "Could not update profile",
          };
        }
      },
    ),
  },
};

export default editProfileResolvers;

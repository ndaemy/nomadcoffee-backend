import bcrypt from "bcrypt";
import client from "../../client";

interface createAccountArgs {
  email: string;
  password: string;
  username: string;
  name: string;
  location: string;
  avatarURL: string;
  githubUsername: string;
}

const createAccountResolvers = {
  Query: {},
  Mutation: {
    createAccount: async (
      _,
      {
        email,
        password,
        username,
        name,
        location,
        avatarURL,
        githubUsername,
      }: createAccountArgs,
    ) => {
      try {
        const exist = await client.user.findFirst({
          where: {
            OR: [{ username }, { email }],
          },
        });
        if (exist) {
          return {
            ok: false,
            error: "User already exist",
          };
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await client.user.create({
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
      } catch (e) {
        return {
          ok: false,
          error: "Something went wrong",
        };
      }
    },
  },
};

export default createAccountResolvers;

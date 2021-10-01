import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import client from "../../client";

interface loginArgs {
  username: string;
  password: string;
}

const loginResolvers = {
  Mutation: {
    login: async (_, { username, password }: loginArgs) => {
      const user = await client.user.findUnique({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found",
        };
      }
      const passwordCorrect = await bcrypt.compare(password, user.password);
      if (!passwordCorrect) {
        return {
          ok: false,
          error: "Incorrect password",
        };
      }
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || "defaultSecret",
      );
      return {
        ok: true,
        token,
      };
    },
  },
};

export default loginResolvers;

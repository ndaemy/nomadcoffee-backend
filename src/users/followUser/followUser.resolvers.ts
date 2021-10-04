import { checkIsLoggedIn } from "../users.utils";
import client from "../../client";
import { Context } from "../../index";

interface followUserArgs {
  username: string;
}

const followUserResolvers = {
  Mutation: {
    followUser: checkIsLoggedIn(
      async (_, { username }: followUserArgs, { currentUser }: Context) => {
        const user = await client.user.findUnique({ where: { username } });
        if (!user) {
          return {
            ok: false,
            error: "User not exist",
          };
        }
        await client.user.update({
          where: {
            id: currentUser!.id,
          },
          data: {
            following: {
              connect: {
                username,
              },
            },
          },
        });
        return {
          ok: true,
        };
      },
    ),
  },
};

export default followUserResolvers;

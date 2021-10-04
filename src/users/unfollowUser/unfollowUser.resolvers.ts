import { checkIsLoggedIn } from "../users.utils";
import client from "../../client";
import { Context } from "../../index";

interface unfollowUserArgs {
  username: string;
}

const unfollowUserResolvers = {
  Mutation: {
    unfollowUser: checkIsLoggedIn(
      async (_, { username }: unfollowUserArgs, { currentUser }: Context) => {
        const user = await client.user.findUnique({
          where: { username },
        });
        if (!user) {
          return {
            ok: false,
            error: "Cannot unfollow user",
          };
        }
        await client.user.update({
          where: {
            id: currentUser!.id,
          },
          data: {
            following: {
              disconnect: {
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

export default unfollowUserResolvers;

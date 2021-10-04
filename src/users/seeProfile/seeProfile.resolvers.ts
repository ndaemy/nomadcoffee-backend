import client from "../../client";

interface seeProfileArgs {
  username: string;
  page?: number;
}

const seeProfileResolvers = {
  Query: {
    seeProfile: async (_, { username, page }: seeProfileArgs) => {
      const user = await client.user.findUnique({
        where: { username },
      });

      if (!user) return null;

      if (page) {
        // @ts-ignore
        user.following = await client.user
          .findUnique({
            where: { username },
          })
          .following({ take: 9, skip: (page - 1) * 9 });
        // @ts-ignore
        user.followers = await client.user
          .findUnique({
            where: { username },
          })
          .followers({ take: 9, skip: (page - 1) * 9 });
      }
      return user;
    },
  },
};

export default seeProfileResolvers;

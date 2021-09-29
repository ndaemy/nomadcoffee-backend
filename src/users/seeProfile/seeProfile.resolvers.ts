import client from "../../client";

interface seeProfileArgs {
  username: string;
}

const seeProfileResolvers = {
  Query: {
    seeProfile: async (_, { username }: seeProfileArgs) =>
      await client.user.findUnique({
        where: { username },
      }),
  },
};

export default seeProfileResolvers;

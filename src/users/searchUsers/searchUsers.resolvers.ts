import client from "../../client";

interface searchUsersArgs {
  keyword: string;
}

const searchUsersResolvers = {
  Query: {
    searchUsers: async (_, { keyword }: searchUsersArgs) =>
      client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        },
      }),
  },
};

export default searchUsersResolvers;

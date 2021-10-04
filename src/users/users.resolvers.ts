import client from "../client";
import { Context } from "../index";

const usersResolvers = {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { currentUser }: Context) => {
      if (!currentUser) {
        return false;
      }
      return id === currentUser.id;
    },
  },
};

export default usersResolvers;

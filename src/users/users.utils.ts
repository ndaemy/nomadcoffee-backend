import jwt, { JwtPayload } from "jsonwebtoken";
import client from "../client";
import { Context } from "../index";

export const checkIsLoggedIn =
  resolver => (root, args, context: Context, info) => {
    if (!context.currentUser) {
      return {
        ok: false,
        error: "Please log in to perform this action",
      };
    }
    return resolver(root, args, context, info);
  };

export const getUser = async token => {
  try {
    if (!token) {
      return null;
    }
    const { id } = (await jwt.verify(
      token,
      process.env.JWT_SECRET || "defaultSecret",
    )) as JwtPayload;
    const user = await client.user.findUnique({ where: { id } });
    if (user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

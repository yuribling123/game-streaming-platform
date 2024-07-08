/* retrieve a user record from the database using their username */
import { db } from "./db";

export const getUserByUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
  });

  return user;
};

import { db } from "./db";
import { getSelf } from "./auth-service";

// Load all users exclude ourself in database
export const getRecommended = async () => {
    let userId;
    try {
        const self = await getSelf();
        userId = self.id;

    } catch {
        userId = null;

    }


    await new Promise(resolve => setTimeout(resolve, 500)); // test purpose

    let users = [];
    // if user is logged in, recommend all user except itself
    if (userId) {
        users = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userId,
                        },
                    },
                    {
                        NOT: {
                            followedBy: {
                                some: {
                                    followerId: userId,
                                },
                            },
                        },
                    },
                ],
            },

            orderBy: {
                createdAt: "desc"
            }
        });

    }
    else
        users = await db.user.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });


    return users;
};

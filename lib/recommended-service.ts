import { db } from "./db";
import { getSelf } from "./auth-service";

// Load all users exclude ourself in database
export const getRecommended = async () => {
    await new Promise(resolve => setTimeout(resolve,500)); // test purpose
    const users = await db.user.findMany({
        orderBy: {
            createdAt: "desc"
        }
    });
    return users;
};

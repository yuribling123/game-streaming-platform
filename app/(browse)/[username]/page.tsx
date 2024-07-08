import { notFound } from "next/navigation";
import {getUserByUsername} from "@/lib/user-service"
import {isFollowingUser} from "@/lib/follow-service"
import { Actions } from "../_components/actions"
interface UserPageProps {
    params: {
        username: string;
    };
}

const userPage
    = async (
        { params }: UserPageProps


    ) => {
        const user = await getUserByUsername(params.username);
        if(!user){
            return notFound();
        }

        const isFollowing = await (isFollowingUser(user.id));

        return (

            <div className="flex flex-col gap-y-4">
                <p>User:{user.username}</p>
                <p>User:{user.externalUserId}</p>
                 {/* ${} convert variable to string */}
                <p>is following: {`${isFollowing}`}</p>
                <p>is following: {`${user.createdAt}`}</p>
                <Actions isFollowing={isFollowing} userId={user.id}/>
           
            </div>
        );
    }

export default userPage;
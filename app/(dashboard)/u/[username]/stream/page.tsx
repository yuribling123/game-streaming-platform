
import { StreamPlayer } from "@/components/stream-player";
import { getUserByUsername } from "@/lib/user-service";
import { currentUser } from "@clerk/nextjs/server";

//parse the URL and provide the username parameter to thiscomponent.
interface CreaterPageProps {
    params:{
        username:string;
    }
}

//extract username from props, use that to grab users
const CreaterPage = async ({params}:CreaterPageProps) => {
    const externalUser = await currentUser();
    const user = await getUserByUsername(params.username);

    if (!user || user.externalUserId !== externalUser?.id || !(user.stream)) {
        throw new Error("Unauthorized");
    }

    return (
    <div className="h-full"> 
       <StreamPlayer user={user} stream={user.stream} isFollowing={true}></StreamPlayer>
    </div>  );
}
 
export default CreaterPage;
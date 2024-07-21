"use client"

import { useViewerToken } from "@/hooks/user-viewer-token";
import { Stream, User } from "@prisma/client";

interface StreamPlayerProps {
    user: User & { stream: Stream | null };
    stream: Stream;
    isFollowing: boolean;
}

export const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
    //console.log("id:"+user.id)
    const { token, name, identity } = useViewerToken(user.id);
    
    if (!token || !name || !identity) {
        return (
            <div>
                Cannot watch the stream
            </div>
        );
    }


    return (<div>Allowed to watch the stream</div>)
}
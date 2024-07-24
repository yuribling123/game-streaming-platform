"use client"

import { useViewerToken } from "@/hooks/user-viewer-token";
import { Stream, User } from "@prisma/client";
import { GridLayout, LiveKitRoom, ParticipantTile } from "@livekit/components-react";
import { Video } from "./video";
import { Room } from "livekit-server-sdk";
import { useEffect } from "react";

interface StreamPlayerProps {
    user: User & { stream: Stream | null };
    stream: Stream;
    isFollowing: boolean;
}

export const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
    //console.log("id:"+user.id)
    const { token, name, identity } = useViewerToken(user.id);
    //console.log("token!"+token)
    const serverUrl = "wss://gamewave-p5uktr2e.livekit.cloud";



    
    //if (!token || !name || !identity)
    if (!token || !name ) {
        return (
            <div>
                not allowed to watch the stream

            </div>
        );
    }


    return (

            <LiveKitRoom  token={token} serverUrl={serverUrl} className="grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 2xl:grid-cols-6 h-full">

                <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                    <Video hostName={user.username} hostIdentity={user.id}/>
                </div>

 
            </LiveKitRoom>
        )
}
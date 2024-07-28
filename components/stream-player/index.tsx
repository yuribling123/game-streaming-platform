"use client"

import { useViewerToken } from "@/hooks/user-viewer-token";
import { Stream, User } from "@prisma/client";
import { GridLayout, LiveKitRoom, ParticipantTile } from "@livekit/components-react";
import { Video } from "./video";
import { Room } from "livekit-server-sdk";
import { useEffect } from "react";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { cn } from "@/lib/utils";
import { Chat } from "./chat";

interface StreamPlayerProps {
    user: User & { stream: Stream | null };
    stream: Stream;
    isFollowing: boolean;
}

export const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
    //console.log("id:"+user.id)
    const { token, name, identity } = useViewerToken(user.id);
    const { collapsed } = useChatSidebar((state) => state)

    //console.log("token!"+token)
    const serverUrl = process.env.NEXT_PUBLIC_LIVEKIT_WS_URL




    //if (!token || !name || !identity)
    if (!token || !name) {
        return (
            <div>
                not allowed to watch the stream

            </div>
        );
    }


    return (

        <LiveKitRoom token={token} serverUrl={serverUrl} className={cn(
            "grid grid-cols-1 lg:gap-y-0 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full",
            collapsed && "lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2"
        )}>

            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-5 lg:overflow-y-auto hidden-scrollbar pb-10">
                <Video hostName={user.username} hostIdentity={user.id} />
            </div>

            {/* chat component */}
            <div
                className={cn(
                    "col-span-1",
                    collapsed && "hidden"
                )}
            >
                <Chat
                    viewerName={name}
                    hostName={user.username}
                    hostIdentity={user.id}
                    isFollowing={isFollowing}
                    isChatEnabled={stream.isChatEnabled}
                    isChatFollowersOnly={stream.isChatFollowersOnly}
                    isChatDelayed={stream.isChatDelayed}
                />
            </div>



        </LiveKitRoom>
    )
}
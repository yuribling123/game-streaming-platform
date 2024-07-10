import { getSelf } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import { ToggleCard } from "./_components/toggle-card";
import { Suspense } from "react";
import ChatLoading from "./loading";

const ChatPage = async () => {
  const self = await getSelf();
  const stream = await getStreamByUserId(self.id);

  if (!stream) {
    throw new Error("Stream not found");
  }

  return (

    <div className="flex flex-col p-10">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">
          Chat settings
        </h1>
      </div>
      <div className="space-y-4">
        <ToggleCard
        field = "isChatEnabled"
        label = "Enable Chat"
        value = {stream.isChatEnabled}
         />
         <ToggleCard
        field = "isChatDelayed"
        label = "Delay Chat"
        value = {stream.isChatDelayed}
         />
         <ToggleCard
        field = "isChatFollowersOnly"
        label = "Followers Only Chat"
        value = {stream.isChatFollowersOnly} 
         />
      </div>
    </div>

  );
};

export default ChatPage;
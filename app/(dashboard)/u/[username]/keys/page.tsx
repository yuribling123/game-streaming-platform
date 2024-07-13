import { Button } from "@/components/ui/button";
import { UrlCard } from "./_components/url-card";
import {KeyCard} from "./_components/key-card"

import { getSelf, getSelfByUsername } from "@/lib/auth-service";
import { getStreamByUserId } from "@/lib/stream-service";
import ConnectModal from "./_components/connect-modal";

const KeysPage = async () => {
   const self = await getSelf();
   const stream = await getStreamByUserId(self.id);
   if(!stream){
      throw new Error("Stream not found");
   }



   return (
      <div className="p-6">
         <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold"> Keys & URLs </h1>

            <ConnectModal></ConnectModal>

         </div>

         <div className="space-y-4">


            <UrlCard value={stream.serverUrl}></UrlCard>
            <KeyCard value="123"></KeyCard>
            
         </div>

      </div>);
}

export default KeysPage; 
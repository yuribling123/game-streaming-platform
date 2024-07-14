/* manage ingress (input streams) in LiveKit environment */
"use server";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { CreateIngressOptions, IngressAudioEncodingPreset, IngressClient, IngressInput, IngressVideoEncodingPreset, IngressVideoOptions, RoomServiceClient, TrackSource } from "livekit-server-sdk"
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);
// reset ingress : remove any old ingresses
export const resetIngresses = async (hostIdentity:string) =>{

    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity,
    })

    const rooms= await roomService.listRooms([hostIdentity])

    for (const room of rooms){
        await roomService.deleteRoom(room.name)
    }

    for(const ingress of ingresses){
        if (ingress.ingressId){
            await ingressClient.deleteIngress(ingress.ingressId);
        }
    }

}



export const createIngress = async (ingressType: IngressInput) => {
    const self = await getSelf();
    resetIngresses(self.id);

    const options: CreateIngressOptions = {
        name: self.username,
        roomName: self.id,
        participantName: self.username,
        participantIdentity: self.id,

    };

    // Select protocols
    if (ingressType === IngressInput.WHIP_INPUT) {
        options.enableTranscoding = false; // Bypass transcoding
    } else {
      // to be done 
       // Using a video preset
    //    options.video = {
    //     source: TrackSource.CAMERA,
    //     preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS
    // };

      
    }

    // Create ingress (example, depending on what the SDK requires)

    const ingress = await ingressClient.createIngress(
        ingressType,
        options,
    );

    if (!ingress || !ingress.url || !ingress.streamKey) {
        throw new Error("Failed to create ingress");
    }

    // update to database
    await db.stream.update({
        where: { userId: self.id },
        data: {
            ingressId: ingress.ingressId,
            serverUrl: ingress.url,
            streamKey: ingress.streamKey,
        },
    });

    // update fields
    revalidatePath(`/u/${self.username}/keys`);
    
    return JSON.parse(JSON.stringify(ingress));

}

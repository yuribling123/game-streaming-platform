import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

// handle webhooks sent by LiveKit
const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

// react to changes in stream status in real-time and update database
export async function POST(req: Request) {
  const body = await req.text();
  const headerPayload = headers();
  const authorization = headerPayload.get("Authorization");

  if (!authorization){
    return new Response("No authorizaiton header",{status:400});
  }

  const event = receiver.receive(body,authorization);

  if((await event).event =="ingress_started"){
    await db.stream.update(
        {
            where:{
                ingressId: (await event).ingressInfo?. ingressId
            },
            data:{
                isLive: true,
            }
        }
    )
  }

  if((await event).event =="ingress_ended"){
    await db.stream.update(
        {
            where:{
                ingressId: (await event).ingressInfo?. ingressId
            },
            data:{
                isLive: false,
            }
        }
    )
  }




}

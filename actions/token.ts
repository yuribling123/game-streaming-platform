"use server";
/* identify/create the identity of the viewer  */
import { getSelf } from "@/lib/auth-service";
import { getUserById } from "@/lib/user-service";
import { jwtDecode } from "jwt-decode";
import { AccessToken } from "livekit-server-sdk";
import { v4 } from "uuid";

export const   createViewerToken = async (hostIdentity: string) => {
  
    let self;

    try {
        self = await getSelf();
    } catch {
        // for not logged in user
        const id = v4();
        const username = `guest#${Math.floor(Math.random() * 1000)}`;
        self = { id, username };
    }
    const host = await getUserById(hostIdentity);
    if (!host) {
        throw new Error("User not found");
    }
    
    // Create a unique jti if not generated automatically

    // host is watching themselves
    const isHost = self.id===host.id;

    const token = new AccessToken(
        process.env.LIVEKIT_API_KEY!,
        process.env.LIVEKIT_API_SECRET!,
        {
            identity: isHost ? `host-${self.id}` : self.id,
            name: self.username, 
        }
    );

    token.addGrant({
        room: host.id,
        roomJoin: true,
        canPublish: false,
        canPublishData: true,
      });
    
  // Generate the JWT token
  const tokenJwt = token.toJwt();

  // Decode the JWT token to modify the payload
  //const decodedPayload = jwtDecode(await tokenJwt) as any;
  
  // Add jti to the payload if not present
//   if (!decodedPayload.jti) {
//       decodedPayload.jti = v4();
//   }

  //Re-encode the JWT with the updated payload
//const base64Header = Buffer.from(JSON.stringify(JSON.parse(Buffer.from((await tokenJwt).split('.')[0], 'base64').toString())), 'utf8').toString('base64');
//const base64Payload = Buffer.from(JSON.stringify(decodedPayload), 'utf8').toString('base64');
//const signature = (await tokenJwt).split('.')[2];

  //const TokenJwt = `${base64Header}.${base64Payload}.${signature}`;
  

  return await Promise.resolve(tokenJwt);
};

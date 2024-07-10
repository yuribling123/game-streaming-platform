/* Updates specific properties of a Stream object for the currently authenticated user */
"use server";
import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";


export const updateStream = async (values: Partial<Stream>) => {
 
    // only updating some properties of the Stream object
    try {
        console.log("i'm in the service");

  
        const self = await getSelf();
       

        const selfStream = await db.stream.findUnique(
            {
                where: {
                    userId: self.id,

                },
            }
        );

        if(!selfStream){
            throw new Error("Stream not Found");
        }

        

        const validData={
            name:values.name,
            isChatEnabled: values.isChatEnabled,
            isChatFollowersOnly: values.isChatFollowersOnly,
            isChatDelayed: values.isChatDelayed,
        }

        const stream = await db.stream.update(
            {
                where:{
                    id:selfStream.id,
                },
                data:{
                    ...validData, //copy the properties from valid Date
                },
            },
          

        )
    
      // refreshes the cached data for a path
      revalidatePath(`/u/${self.username}/chat`);
      revalidatePath(`/u/${self.username}`);
      revalidatePath(`/${self.username}`);
      return stream;
    } catch (error) {
        throw new Error("Internal Error");

    };

}
// using current user in clerk to fetch user in our database
import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export const getSelf = async () =>{
    const self = await currentUser();
    if (!self||!self.username){
        throw new Error("unauthorized");
    }
    const user = await db.user.findUnique(
        {
            where: {externalUserId: self.id}
        }
    )

    if(!user){
        throw new Error("Not found");
    }

    return user; 

}

export const getSelfByUsername = async (username:string) =>{
    const self = await currentUser();
    if(!self||!self.username){
        throw new Error("unauthorized")
    }

    const user = await db.user.findUnique(
        {
            where:{username}
        }
    );

    if(!user){
        throw new Error("User not found");
    }
    // prevent other user access your dash board
    if(self.username!=user.username){
        throw new Error("Unauthorized")
    }

    return user;

}
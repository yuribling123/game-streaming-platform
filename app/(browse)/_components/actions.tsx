/* renders a button that follow a user  */
"use client";
import { Button } from "../../../components/ui/button";
import { onFollow,onUnfollow} from "../../../actions/follow";
import { useTransition } from "react";
import React from "react";
import {toast} from "sonner"

interface ActionsProps {
    isFollowing: boolean;
    userId: string
};

export const Actions = ({ isFollowing,userId }: ActionsProps) => {
    const [isPending, startTransition] = useTransition();

    const handleFollow = () => {
        // ensures handle api smoothly
        startTransition(() => {
            onFollow(userId)
            .then((data)=>toast.success(`You are following ${data.following. username}`))
            .catch(()=>toast.error("Somethingwrong"));
        });
    };
    const handleUnFollow = () => {
        // ensures handle api smoothly
        startTransition(() => {
            onUnfollow(userId)
            .then((data)=>toast.success(`You have unfollowed ${data.following. username}`))
            .catch(()=>toast.error("Somethingwrong"));
        });
    };

    const onClick = ()=>{
        if (isFollowing){
            return handleUnFollow();
        }
        else{
            return handleFollow();
        }
    }

    return (
        <Button disabled={  isPending} onClick={onClick} variant="primary"> 
            {isFollowing?"unfollow":"follow"}
        </Button>
    );
};

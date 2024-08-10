"use client";

import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { useTransition } from "react";
import { onFollow,onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

interface ActionsProps {
    hostIdentity: string;
    isFollowing: boolean;
    isHost: boolean;
}

export const Actions = ({
    hostIdentity,
    isFollowing,
    isHost,
}: ActionsProps) => {
    const [isPending,startTransition]= useTransition();

    const userId = useAuth();
    const router = useRouter();

    const handleFollow = () => {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success(`You are now following ${data.following.username}`))
                .catch(() => toast.error("something went wrong"))
        });
    };

    const handleUnFollow = () => {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data) => toast.success(`You unfollowed ${data.following.username}`))
                .catch(() => toast.error("something went wrong"))
        });
    };

    const toggleFollow = () => {
        if (!userId) {
            return router.push("/sign-in");
        }

        if (isHost) return;

        if (isFollowing) {
           handleUnFollow();
        } else {
            handleFollow();
        }
    };

    return (
        <Button
            onClick={toggleFollow}
            disabled={isPending || isHost }
            variant="primary"
            size="sm"
            className="w-full lg:w-auto"
        >
            <Heart
                className={cn(
                    "h-4 w-4 mr-2",
                    isFollowing ? "fill-white" : "fill-none"
                )}
            />

            {
                isFollowing ? "Unfollow" : "Follow"
            }
        </Button>


    );
};

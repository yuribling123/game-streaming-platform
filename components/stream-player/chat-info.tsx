import { useMemo } from "react";
import { Info } from "lucide-react";
import { Hint } from "../ui/hint";


interface ChatInfoProps {
    isDelayed: boolean;
    isFollowersOnly: boolean;
}

export const ChatInfo = ({
    isDelayed,
    isFollowersOnly
}: ChatInfoProps) => {
    const hint = useMemo(() => {
        if (isFollowersOnly) {
            return "only followers can chat";
        }
        // if (isDelayed && !isFollowersOnly) {
        //   return "Slow mode";
        // }
        // if (isDelayed && isFollowersOnly) {
        //   return "Only followers can chat. Messages are delayed by 3 seconds";
        // }
        return "";
    }, [isDelayed, isFollowersOnly]);

    const label = useMemo(() => {
        if (isFollowersOnly) {
            return "Followers only";
        }
        // if (isDelayed && !isFollowersOnly) {
        //   return "Slow mode";
        // }

        // if (isDelayed && isFollowersOnly) {
        //   return "Only followers can chat. Messages are delayed by 3 seconds";
        // }
        return null;
    }, [isDelayed, isFollowersOnly]);




    return (
        <div className="p-2 text-muted-foreground bg-white/5 border border-white/10 w-full rounded-t-md flex items-center gap-x-2">
            <Hint label={hint}>
                <Info className="h-4 w-4" />
            </Hint>
            <p className="text-xs font-semibold">
                {label}
            </p>

        </div>
    );
};

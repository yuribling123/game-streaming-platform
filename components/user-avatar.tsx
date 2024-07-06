/* the outlook of the user avartar */
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar";
import { cva, VariantProps } from "class-variance-authority";
import { LiveBadge } from "./live-badge";


// provide default or large size for avartars
const avatarSizes = cva("", {
    variants: {
        size: {
            default: "h-8 w-8",
            lg: "h-14 w-14",
        },
    },
    defaultVariants: {
        size: "default",
    },
});


interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    username: string;
    imageUrl: string;
    isLive?: boolean;
    showBadge?: boolean;
};



export const UserAvatar = ({ username, imageUrl, isLive, showBadge, size, }: UserAvatarProps) => {
    const canShowBadge = showBadge && isLive;




    return (
        <div className="flex flex-row">
            <Avatar className={cn(isLive && "ring-2 ring-rose-500 border border-background", avatarSizes({ size }))}>
                <AvatarImage src={imageUrl} className="object-cover"></AvatarImage>
                <AvatarFallback>
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
            
           

        </div>)
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {};

// indicate loading
export const UserAvatarSkeleton = ({
    size,
  }: UserAvatarSkeletonProps) => {
    return (
      <Skeleton className={cn(
        "rounded-full",
        avatarSizes({ size }),
      )} />
    );
  };
  
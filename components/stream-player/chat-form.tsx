import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ChatInfo } from "./chat-info";

interface ChatFormProps {
    onSubmit: () => void;
    value: string;
    onChange: (value: string) => void;
    isHidden: boolean;
    isFollowersOnly: boolean;
    isFollowing: boolean;
    isDelayed: boolean;
}

export const ChatForm = ({
    onSubmit,
    value,
    onChange,
    isHidden,
    isFollowersOnly,
    isFollowing,
    isDelayed,
}: ChatFormProps) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents the default form submission behavior
        e.stopPropagation();// Preventing any parent event handlers from being triggered
      
        if (!value ) return;
      
        // if (isDelayed && !isDelayBlocked) {
        //   setIsDelayBlocked(true);
        //   setTimeout(() => {
        //     setIsDelayBlocked(false);
        //     onSubmit();
        //   }, 3000);
          onSubmit();
        
      };
      


    return (
        // Chat form JSX here
        <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-y-4 p-3"
        >
            <ChatInfo isDelayed={isDelayed} isFollowersOnly={isFollowersOnly}></ChatInfo>
            <Input
                onChange={(e) => onChange(e.target.value)}
                value={value}
                disabled={false}
                placeholder="Send a message"
                className={cn(
                    "border-white/10"
                )}
            />
            <div className="ml-auto">
                <Button
                    type="submit"
                    variant="primary"
                    size="sm"
                    disabled={!value||isHidden}
                >
                    Chat
                </Button>
            </div>

        </form>

    );
};

export const ChatFormSkeleton = () => {
    return (
      <div className="flex flex-col items-center gap-y-4 p-3">
        <Skeleton className="w-full h-10" />
        <div className="flex items-center gap-x-2 ml-auto">
          <Skeleton className="h-7 w-7" />
          <Skeleton className="h-7 w-12" />
        </div>
      </div>
    );
  };
  

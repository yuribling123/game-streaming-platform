"use client";
import { useSidebar } from "@/store/use-sidebar";
import { Follow, Stream, User } from "@prisma/client";
import { UserItem, UserItemSkeleton } from "./user-item";

// Define the props for the Following component
interface FollowingProps {
  data: (Follow & { following: User & {stream: {isLive: boolean} | null;},})[];
}

export const Following = ({ data }: FollowingProps) => {
  // Destructure the collapsed state from the useSidebar hook
  const { collapsed } = useSidebar((state) => state);

  // Check if there are any followed users
  if (!data.length) {
    return null;
  }

  // Render the following user details
  return (
    <div>
      {!collapsed && (
        <div>
          <div className="p-4">Following</div>
          <ul className="space-y-2 px-2">
            {data.map((follow) => (
              <UserItem
                key={follow.following.id}
                username={follow.following.username}
                imageUrl={follow.following.imageUrl}
                isLive={follow.following.stream?.isLive}
              />
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};


export const FollowingSkeleton = () => {
    return (
      <ul className="px-2 pt-2 lg:pt-0">
        {[...Array(3)].map((_, i) => (
          <UserItemSkeleton key={i} />
        ))}
      </ul>
    );
  };
  

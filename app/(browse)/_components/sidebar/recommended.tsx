/* the recommende user list */
"use client";
import { useSidebar } from "@/store/use-sidebar";  // Assuming the correct import path for useSidebar
import { User } from "@prisma/client"
import { UserItem } from "./user-item";
import { UserItemSkeleton } from "./user-item";

interface RecommendedProps {
    data: User[];  // Replace `any` with the appropriate type for your data if known
}

export const Recommended = ({ data }: RecommendedProps) => {
    const { collapsed } = useSidebar((state) => state);
    const showLabel = !collapsed && data.length > 0;

    return (
        <div>
            {showLabel && <div className="p-4">Recommended</div>}

            {/* //display each user in the userlist(data) */}
    
            <ul className="space-y-5 px-2">
                {
                    data.map(
                        (user) => (
                           <UserItem key = {user.id}  username ={user.username}  imageUrl={user.imageUrl} isLive={true} ></UserItem>
                        )
                    )
                } 
            </ul>
        </div>
    );
};

// render three UserItemSkeleton components
export const RecommendedSkeleton = () => {
    return (
      <ul className="px-2">
        {[...Array(3)].map((_, i) => (
          <UserItemSkeleton key={i} />
        ))}
      </ul>
    );
  };
  

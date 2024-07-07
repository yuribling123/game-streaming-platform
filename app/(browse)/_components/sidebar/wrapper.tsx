/* container for other components */
"use client";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useIsClient } from "usehooks-ts";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";

// container for other components 
interface WrapperProps {
    children: React.ReactNode;
};


export const Wrapper = ({
    children,
}: WrapperProps) => {
    //  extract the collapse state property from the sidebar's state
    const { collapsed } = useSidebar((state) => state);
    const [isClient, setIsClient] = useState(false);

    //After the component runs on the client side, the useEffect hook is used to update isClient to true.
    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return (<aside className={cn("fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2D2E35] z-50" ) }> 
    <ToggleSkeleton></ToggleSkeleton>
    <RecommendedSkeleton></RecommendedSkeleton>
    </aside>);
    
    return ( 
        <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50" ,collapsed && "w-[70px]") }>
            {children}
        </aside>
    );
}
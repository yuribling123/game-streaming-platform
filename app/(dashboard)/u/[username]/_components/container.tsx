"use client";
import { cn } from "@/lib/utils";
import { useCreatorSideBar } from "@/store/use-creator-sidebar";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

// if the sidebar is collapsed, adjust left margin of home page

interface ContainerProps {
    children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
    const matches = useMediaQuery("(max-width: 1024px)");
    const {collapsed,onCollapse,onExpand} =  useCreatorSideBar((state)=> state);
    useEffect(
        ()=>{
            // if we are on mobile, collapse
            if(matches){onCollapse()} else{onExpand()};
        },[matches,onCollapse,onExpand]
    ); 


 
    return (
        // if collapsed push content by 70 pixels
        <div className ={cn("flex-1",collapsed ? "ml-[70px]":"ml-[70px] lg:ml-60")}>
            {children}
        </div> 
    );
};

"use client";

import { cn } from "@/lib/utils";
import { useCreatorSideBar } from "@/store/use-creator-sidebar";

interface WrapperProps {
    children: React.ReactNode 
}

export const Wrapper = (
    {children} : WrapperProps
) =>{
    const {collapsed} = useCreatorSideBar((state)=>state); 
    return(
        <aside className={cn("fixed left-0 flex flex-col w-[70px] h-full lg:w-60 bg-background border-r border-[#2D2E35] z-50",
            collapsed && "lg:w-[70px]"
         )}>
           {children}

        </aside>
    )
}
"use client";
import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";

// container for other components 
interface WrapperProps {
    children: React.ReactNode;
};


export const Wrapper = ({
    children,
}: WrapperProps) => {
    //  extract the collapse state property from the sidebar's state
    const { collapsed } = useSidebar((state) => state);
    return ( 
        <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2D2E35] z-50" ,collapsed && "w-[70px]") }>
            {children}
        </aside>
    );
}
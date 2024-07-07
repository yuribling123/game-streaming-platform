"use client";

import { useSidebar } from "@/store/use-sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";
import { Hint } from "@/components/ui/hint";
import { Skeleton } from "@/components/ui/skeleton";

export const Toggle = () => {
    const {
        collapsed,
        onExpand,
        onCollapse
    } = useSidebar((state) => state);
    const label = collapsed ? "Expand" : "Collapse"
    return (
        <>
            {/* when collapsed display expand button */}
            {collapsed && (<div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4 ">
                <Hint label={label} side="right" asChild><Button onClick={onExpand} variant="ghost"> <ArrowRightFromLine className="h-4 w-4"> </ArrowRightFromLine> </Button></Hint>
            </div>)}

            {/* when expanded display collapse button */}
            {!collapsed && (<div className="p-3 pl-6 mb-2 flex items-center w-full">
                <p className="font-semibold text-primary" >side bar</p>
                <Hint label={label} side="right" asChild>
                <Button onClick={onCollapse} className="h-auto p-2 ml-auto" variant="ghost">
                    <ArrowLeftFromLine className="h-4 w-4" />
                </Button>
                </Hint> 
            </div>)}
        </>

    )
        ;
};

// for hydration error
export const ToggleSkeleton = () => {
    return (
      <div className="p-3 pl-6 mb-2 hidden lg:flex items-center justify-between w-full">
        <Skeleton className="h-6 w-[100px]" />
        <Skeleton className="h-6 w-6" />
      </div>
    );
  };
  
  
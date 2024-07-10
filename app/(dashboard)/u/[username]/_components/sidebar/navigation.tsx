/* construct navigation with four navigation icons */
"use client";

import { useUser } from "@clerk/nextjs";
import { Fullscreen,KeyRound, MessageSquare, Users, } from "lucide-react";
import { usePathname } from "next/navigation";
import { NavItem, NavItemSkeleton } from "./nav-item";


export const Navigation = () =>{
    // returns current path of the url
    const pathname = usePathname();
    const {user} = useUser();
    const routes = [
    {
        label:"Stream",
        href:`/u/${user?.username}/stream`,
        icon: Fullscreen
    },
    {
        label:"Key",
        href:`/u/${user?.username}/keys`,
        icon: KeyRound, 
    },
    {
        label:"Chat",
        href:`/u/${user?.username}/chat`,
        icon: MessageSquare, 
    }, 
    {
        label:"Community",
        href:`/u/${user?.username}/community`,
        icon: Users, 
    }, 
    ]

    if (!user?.username) {
        return (
            <ul className="space-y-2 hidden lg:block">
                {[...Array(4)].map((_, i) => (
                    <NavItemSkeleton key={i} />
                ))}
            </ul>
        );
    }
 
    return(
        <ul className="space-y-6 px-2 pt-4 lg:pt-0">
            {routes.map(
                (route) =>(
                    <NavItem 
                    key={route.href} 
                    label={route.label}
                    icon={route.icon}
                    href={route.href}
                    isActive={pathname === route.href}
                    />
                    
                )

            ) }    
        </ul>
    );
}
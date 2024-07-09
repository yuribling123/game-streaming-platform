import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { Clapperboard, LogOut } from "lucide-react";


export const Actions = async () => {
    const user = await currentUser();


    return (
        <div className="flex items-center justify-end gap-x-2 ml-4 lg:ml-0">
            {/* no user : display login */}
            {!user && (
                <SignInButton>
                    <Button variant="primary" size="sm">Login</Button>
                </SignInButton>
            )
            }

            {/* check yes user : display dashboard */}
            {
                !!user && (
                    <div className="flex items-center justify-end gap-x-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" asChild>
                            <Link href={"/"}>
                                <LogOut className="h-5 w-5 mr-2">
                                    Exit
                                </LogOut>
                            </Link>
                        </Button>
                        <UserButton afterSignOutUrl="/ "></UserButton>
                    </div>
                )
            }

        </div>

    );
}
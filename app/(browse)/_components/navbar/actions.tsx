import { SignInButton, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import Link from "next/link"
import { Clapperboard } from "lucide-react";


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
                    <div className="flex items-center gap-x-4">

                        <Button size="sm" variant="ghost" className="text-muted-foregroundn hover:text-primary" > 
                        <Link href={`/u/${user.username}`}  className="flex items-center space-x-2">
                            <Clapperboard className="h-5 w-5 lg:mr-2" />  <span className="hidden lg:block"> Dashboard </span>
                        </Link>
                        </Button>
                        <UserButton afterSignOutUrl="/ "> </UserButton>

                    </div>
                )
            }

        </div>

    );
}
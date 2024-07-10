
import { Navbar } from "@/app/(dashboard)/u/[username]/_components/navbar";
import { getSelfByUsername } from "@/lib/auth-service";
import { redirect } from "next/navigation";
import { Sidebar } from "@/app/(dashboard)/u/[username]/_components/sidebar"
import { Container } from "./_components/container";



interface CreatorLayoutProps {
    params: { username: string }
    children: React.ReactNode

}
const CreatorLayout = async (
    
    { params, children }: (CreatorLayoutProps)
) => {
    const self = await getSelfByUsername(params.username);

    //only ourself can access  the dashboard
    if (!self) {
        redirect("/");
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="flex h-full pt-20">
            <Sidebar></Sidebar>
            {/* to push the content for side bar  */}
            <Container>
                {children}
            </Container>    

            </div>
        </>
    );
}

export default CreatorLayout;
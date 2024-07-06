import { Navbar } from "./_components/navbar";
import { Sidebar, SidebarSkeleton  } from "./_components/sidebar";
import {Container} from "./_components/container";
import { Suspense } from "react";
const BrowseLayout = ({
    children
}: {
    children: React.ReactNode;
}
) => {
    return (
        <>
        <Navbar />
        <div className="flex h-full pt-20">
        <Suspense fallback={<SidebarSkeleton/>}>
        <Sidebar />  
        </Suspense>
        {/* server component wrapped around by client component   */}
        <Container> 
            {children}
        </Container>
        </div>
        </>
    );
}

export default BrowseLayout;
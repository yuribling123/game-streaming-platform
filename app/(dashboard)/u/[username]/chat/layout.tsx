// components/ChatLayout.tsx
import React, { Suspense } from "react";
import Loading from "./loading";

interface ChatLayoutProps {
    children: React.ReactNode;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({ children }) => {
    return (
        <Suspense fallback={<Loading />}>
            {children}
        </Suspense>
    );
};

export default ChatLayout;

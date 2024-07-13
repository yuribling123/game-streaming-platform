"use client";

import { Button } from "@/components/ui/button";
import { CheckCheck, Copy } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
    value?: string;
}

export const CopyButton = ({ value }: CopyButtonProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const onCopy = () => {
        if (!value) { return };
        setIsCopied(true);
        // reset it after 1 second
        setTimeout(() => {
            setIsCopied(false);
        }, 1000);
    }

    const Icon = isCopied ? CheckCheck : Copy;




    return (
        <Button onClick={onCopy} variant = "ghost" disabled = {!value||isCopied} size="sm">
            <Icon></Icon>
        </Button>
    );
}

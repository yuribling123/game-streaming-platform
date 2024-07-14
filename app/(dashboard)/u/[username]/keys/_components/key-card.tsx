"use client";
import { Input } from "@/components/ui/input";
import { CopyButton } from "./copy-button";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface KeyCardProps {
    value: string | null;
}

export const KeyCard = ({ value }: KeyCardProps) => {
    const [show,setShow] = useState(false);

    return (
        <div className="rounded-xl p-6 bg-muted" >
            <div className="flex items-center gap-x-10">
                <p className="shrink-0 font-semibold"> Stream Key </p>
                <div className=" w-full">
                    <div className="w-full flex items-center gap-x-2">
                        <Input value={value || ""}  placeholder="Stream key" type={show ? "text" :"password"} readOnly/>
                        <CopyButton></CopyButton>
                    </div>
                    <Button className="pt-4" size="sm" variant="link" onClick={()=>setShow(!show)}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
"use client";
import qs from "query-string";
import { useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export const Search = () => {
    const router = useRouter();
    const [value, setValuel] = useState("")
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!value) return;
        const url = qs.stringifyUrl(
            {
                url: "/search",
                query: { term: value }
            },
            {
                skipEmptyString: true
            }

        );
        //Performing a client-side navigation.
        router.push(url);

    }
    const onClear =() =>{
        setValuel(""); 
    }


    return (
        <form onSubmit={onSubmit} className="relative w-full lg:w-[400px] flex items-center">
            <Input value={value} onChange={(e)=>setValuel(e.target.value)} placeholder="search" className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0"></Input>
            {value && (<X onClick={onClear} className="absolute top2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition" ></X>)}
            <Button type="submit" size="sm" variant="secondary" className="rounded-l-none">
                <SearchIcon className="h-5 w-5 text-muted-foreground" > </SearchIcon>
            </Button>

        </form> 
    );
};
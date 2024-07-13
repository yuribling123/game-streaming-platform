"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader } from "@/components/ui/dialog";
import { DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DialogClose } from "@radix-ui/react-dialog";

import { AlertTriangle } from "lucide-react";

const ConnectModal = () => {
    return (
    <Dialog>
       <DialogTrigger asChild>
        <Button variant="primary"> Generate Connection </Button>

       </DialogTrigger>

       <DialogContent>
            <DialogHeader>
                <DialogTitle>Generate Connection</DialogTitle>
            </DialogHeader>
             <Select>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Ingress Type"></SelectValue>
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="RTMP">RTMP</SelectItem>
                    <SelectItem value="WHIP">WHIP</SelectItem>
                </SelectContent>

             </Select>
            <Alert>
                <AlertTriangle className="h-4 w-4"></AlertTriangle>
                <AlertTitle></AlertTitle>
                <AlertDescription>
                    This action will reset all active streams using the current connection
                </AlertDescription>
            </Alert>
            <div className="flex justify-between">
                <DialogClose>
                    <Button variant="ghost">Cancel</Button>
                </DialogClose>
                    <Button variant="primary" >Generate</Button>

            </div>


       </DialogContent>
    </Dialog> 
     );
}
 
export default ConnectModal;
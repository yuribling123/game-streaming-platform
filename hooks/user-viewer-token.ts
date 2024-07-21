import { toast } from "sonner";
import { useEffect, useState } from "react";
import { JwtPayload, jwtDecode } from "jwt-decode";
import { createViewerToken } from "@/actions/token";

export const useViewerToken = (hostIdentity: string) => {
    const [token, setToken] = useState("");
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");
    //perform side effects in components
    //run createToken when hostIdentity changes.
    useEffect(() => {
        const createToken = async () => {
            try {
                const viewerToken = await createViewerToken(hostIdentity);
                
                setToken(viewerToken);
                const decodedToken = jwtDecode(viewerToken) as JwtPayload & { name?: string };
                const name = decodedToken?.name;
                const identity = decodedToken.jti;
                // console.log("token"+decodedToken)
                // console.log("name"+name)
                // console.log("identity"+identity)

                if (identity) {
                    setIdentity(identity);
                }

                if (name) {
                    setName(name);
                }
 

            } catch {
                toast.error("Something went wrong");
            }
        };

        createToken();
    }, [hostIdentity]);
    return{
        token,
        name,
        identity 
    }
};

import { Loader2 } from "lucide-react";

export default function AdminLoading (){
    return <div className="flex justify-center h-screen items-center">
        <Loader2 className="size-24 animate-spin"/>
    </div>
}
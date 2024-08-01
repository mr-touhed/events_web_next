"use client"

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";


const RegisterBtn = ({className}) => {
    const { data: session, status, update } = useSession()
    const [register,setRergister] = useState(false);
    useEffect(()=>{

        if(register){
            setTimeout(()=> {
                setRergister(false)
            },5000)
        }
    },[register])
    return (
        <>
        <Button className={cn(`${className}`)}  onClick={()=>setRergister(true) }>Register</Button>
        {register && <div className="fixed w-[80%] h-[50%] top-0 translate-50 bg-[#ffffffe4] p-6 grid place-items-center backdrop-blur-sm  z-[100000]">
                    <div>
                        {
                            session?.user ? <h2>Registration   SuccessFully </h2> : <Link href="/login" className="px-6 py-2 bg-yellow-300 "> please Log in First !</Link>
                        }
                    </div>   
        </div>}
        </>
    );
};

export default RegisterBtn;
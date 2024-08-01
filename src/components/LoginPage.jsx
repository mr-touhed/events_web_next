"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

const LoginPage = () => {
    const router = useRouter()
    const [login,setlogin] = useState({ email:"", password:""});
    const [error,setError] = useState('')
    const changeInput = (e) =>{
        const field = e.target.name;
        const value = e.target.value;
        setlogin(prev => ({...prev, [field]:value }))
    }

    const handel_Login = async  (e) =>{
        e.preventDefault();
        setError('')
        try {
            
            if(!login.email) return setError("Email field is required")
            if(!login.password) return setError("Password field is required")
              const result =  await  signIn('credentials',{...login, redirect:false})
                    if(!result.ok){
                       return setError(result.error)
                    }else{
                        return router.replace("/") 
                    }
                
        } catch (error) {
            
        }
    }

    return (
        <div className="container grid place-items-center h-[80vh]">
                    <div className="md:w-[60%]  p-16 space-y-2">

                        <h2 className="text-2xl font-extralight text-center">Login</h2>
                        <form onSubmit={handel_Login} className="w-full border-2 p-4 rounded-md ">
                                
                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="email">email</Label>
                            <Input type="email" id="email" placeholder="email" name="email" value={login.email} onChange ={e => changeInput(e)}/>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="password">password</Label>
                            <Input type="password" id="email" placeholder="password" name="password" value={login.password} onChange ={e => changeInput(e)}/>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                             <Label className={`text-red-400 font-thin text-sm text-center ${error ? "visible" : "invisible"}`}>{error}</Label>
                            <Button type="submit" className="text-white">Login</Button>
                            <Link href="/register" className="text-right text-sm "> if you don't have any account <span className="text-red-700 underline">register !</span></Link>
                            </div>
                           

                        </form>
                    </div>
        </div>
    );
};


export default LoginPage;
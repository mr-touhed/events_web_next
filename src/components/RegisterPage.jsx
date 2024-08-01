"use client"
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRouter } from "next/navigation";
import Link from "next/link";

const RegisterPage = () => {
    const router = useRouter()
    const [register,setRegister] = useState({name:"", email:"", password:""});
    const [error,setError] = useState('')
    const changeInput = (e) =>{
        const field = e.target.name;
        const value = e.target.value;
        setRegister(prev => ({...prev, [field]:value }))
    }

    const handel_register = async  (e) =>{
        e.preventDefault();
        setError('')
        try {
            if(!register.name) return setError("name field is required")
            if(!register.email) return setError("Email field is required")
            if(!register.password) return setError("Password field is required")

                const res = await fetch("/api/users",{
                    method:"POST",
                    headers:{
                        "content-type":"application/json"
                    },
                    body: JSON.stringify(register)
                })
                const result = await res.json();
                if(!result.status){
                    setError(result.message) 
                }else{
                router.push("/login")
                }
                
        } catch (error) {
            
        }
    }

    return (
        <div className="container grid place-items-center h-[80vh]">
                    <div className="md:w-[60%]  p-16 space-y-2">

                        <h2 className="text-2xl font-extralight text-center">Register</h2>
                        <form onSubmit={handel_register} className="w-full border-2 p-4 rounded-md ">
                                <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="name">Full Name</Label>
                            <Input type="text" id="name" placeholder="full name" name="name" value={register.name} onChange ={e => changeInput(e)} />
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="email">email</Label>
                            <Input type="email" id="email" placeholder="email" name="email" value={register.email} onChange ={e => changeInput(e)}/>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                            <Label htmlFor="password">password</Label>
                            <Input type="password" id="email" placeholder="password" name="password" value={register.password} onChange ={e => changeInput(e)}/>
                            </div>
                            <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                             <Label className={`text-red-400 font-thin text-sm text-center ${error ? "visible" : "invisible"}`}>{error}</Label>
                            <Button type="submit" className="text-white">Register</Button>
                            <Link href="/login" className="text-right text-sm "> if alrady have an account <span className="text-red-700 underline">login !</span></Link>
                            </div>
                            

                        </form>
                    </div>
        </div>
    );
};

export default RegisterPage;
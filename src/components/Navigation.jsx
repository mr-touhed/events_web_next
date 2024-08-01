"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { RiCloseLargeLine } from "react-icons/ri";
import { signOut, useSession } from "next-auth/react";

const Navigation = () => {
    const session = useSession();
  
    const {data,status} = session
    const [showMenu,setShowMenu] = useState(false)
    return (
        <header className="  border-b-2 shadow-md border-b-slate-100 p-4">
                <div className="container flex justify-between items-center relative">
                <Link href="/" className="text-xl font-extrabold">Events</Link>
                    <nav className="md:block hidden">
                        <ul className="flex gap-16 text-sm">
                            <li>
                                <Link href={'/'}>Home</Link>
                            </li>
                            <li>
                            <Link href={'/events'}>Events</Link>
                            </li>
                           {data?.user && <li>
                                <Link href="/dashboard/events">Dashboard</Link>
                            </li>}
                            <li>
                                <Link href="/about">About Us</Link>
                            </li>
                        </ul>
                    </nav>
                    <div>
                    <div className="md:block hidden">
                    {data?.user ? <Button className="text-white" varient="outline" onClick={()=> signOut()}>Logout</Button> : 
                            <Button className="text-white" varient="outline">
                                    <Link href="/login">Login</Link>
                                </Button>}
                    </div>
                        <div className="md:hidden block">
                        {!showMenu ?  <button onClick={() => setShowMenu(!showMenu)}>
                        <RxHamburgerMenu />
                        </button> : <button onClick={() => setShowMenu(!showMenu)}>
                        <RiCloseLargeLine />
                        </button>}
                        </div>
                    </div>
                    {
                        showMenu  && <div className={`md:hidden block absolute ${showMenu ? "-right-5" : "-right-[100vw]"} top-12 w-[100vw] bg-[#dedddd3e] backdrop-blur-sm text-right p-4 gap-6 transition-all duration-100 ease-out z-50`}>
                                <ul className="flex flex-col gap-6 text-sm">
                            <li>
                                <Link href={"/"}>Home</Link>
                            </li>
                            <li>
                            <Link href={"/events"}>Events</Link>
                            </li>
                            {data?.user && <li>
                            <Link href={"/dashboard/events"}>Dashboard</Link>
                            </li>}
                            <li>
                            <Link href={"/about"}>About Us</Link>
                            </li>
                            <li>
                            {data?.user ? <Button className="text-white" varient="outline" onClick={()=> signOut()}>Logout</Button> : 
                            <Button className="text-white" varient="outline">
                                    <Link href="/login">Login</Link>
                                </Button>}
                            </li>
                        </ul>

                            </div>
                    }
                </div>
        </header>
    );
};

export default Navigation;
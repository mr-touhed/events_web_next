"use client"

import { useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

const EventComments =  ({commentsData}) => {
    const {id} = useParams()
    
    const [comments,setComments] = useState([{name:"touhed",message:"This is Test Comments", likes:[1,2,3,45,5,6,5,7,8,88,]},...commentsData ])
    const [massage,setsms] = useState('')
    const { data: session, status, update } = useSession()
    
    
    
    const addComments = (sms) =>{
        setComments(prev => ([...prev,{name:session?.user?.name,message:sms, likes:[]}]))
    }
     const handel_add_comment = async (e) =>{
                
        e.preventDefault();
        if(!massage || !session.user ){
            return 
        }

                try {
                    const newComment = {name:session?.user?.name,message:massage, likes:[]}
            const res =await  fetch(`/api/events/comments/${id}`,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify(newComment)
            })
        addComments(massage);
        setsms('')
                } catch (error) {
                    
                }
     }
    return (
        <div className="bg-slate-100 p-6 space-y-2">
            <div className="grid grid-cols-1 gap-2">
            {
                comments?.map((comment,i) => <div key={i} className=" bg-slate-50 p-2 rounded-md border border-slate-200">
                                <div className="">
                                <p className="uppercase">{comment.name}</p>
                                <p className="text-sm ">{comment.message}</p>
                                <p className="text-sm text-right"> {comment?.likes?.length} likes</p>
                                </div>
                                </div> )
            }
            </div>
             <form  onSubmit={handel_add_comment} className="space-y-4">
                                <Textarea value={massage} onChange={ e =>setsms(e.target.value)} placeholder="comments..." required></Textarea>
                                    <Input type="submit" value={`${!session?.user ? "please register first" : "comments"}`}  className="bg-slate-200 disabled:bg-slate-50" disabled={!session?.user}/>
                                   
                                </form>
        </div>
    );
};

export default EventComments;
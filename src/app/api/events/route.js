import { NextResponse } from "next/server";
import Events from "../../../../models/events";
import MongoDb_Connect from "@/lib/mongodb";


export const POST = async (req) =>{
        try {
            const body = await req.json();
            console.log(body);
            const {title,details,price,image,category,date,time,location} = body;
            const newEvent = {dateInfo:{date,time},title,details,price,image,category,location };
                 await  Events.create(newEvent) ;
           
            return NextResponse.json({status:true, message:"add event Successfully"})
        } catch (error) {
            return NextResponse.json({status:false, message:"server error", error:error.message})
        }
}


export const GET = async () =>{
    try {
                 await MongoDb_Connect()
        const data = await Events.find();
        return NextResponse.json({data})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"server Error"})
    }
}

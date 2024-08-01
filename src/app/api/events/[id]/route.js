import { NextResponse } from "next/server";
import Events from "../../../../../models/events";
import MongoDb_Connect from "@/lib/mongodb";


export const GET = async (req,{params}) => {
        try {
            const {id} = params;
           await  MongoDb_Connect();
           const data = await Events.findById(id);
           return NextResponse.json({status:true,data})
        } catch (error) {
            return NextResponse.json({status:false, message:"server Error"})
        }
}

export const DELETE =async  (req,{params}) =>{
        try {
            
            const {id} = await params ;
            await MongoDb_Connect()
               const result = await  Events.findByIdAndDelete(id);
               if(result){
                return NextResponse.json({status: true, message: "delete Successfully"})
               }else{
                return NextResponse.json({status: false, message: "can't delete right now "})
               }
            
        } catch (error) {
                console.log(error);
                return NextResponse.json({status: false, message:"server error"})
        }
}

export const PATCH = async (req,{params}) => {
    try {
        const id = params.id
        const body = await  req.json();
        const {title,details,price,image,category,date,time,location} = body;
        const newEvent = {dateInfo:{date,time},title,details,price,image,category,location };
         await MongoDb_Connect();
        const result = await Events.findByIdAndUpdate(id,newEvent);
        if(result){
            return NextResponse.json({status:true,message:"Update Events"})
        }else{
            return NextResponse.json({status:false,message:"Not Update Events"})
        }
        
    } catch (error) {
        console.log(error);
        return NextResponse.json({})
    }
}
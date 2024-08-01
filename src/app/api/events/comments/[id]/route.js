import MongoDb_Connect from "@/lib/mongodb";
import { NextResponse } from "next/server";
import Events from "../../../../../../models/events";

export const POST = async (req,{params}) => {
    try {
        const id = params.id
        const body = await  req.json();
        
        const {name,message,likes} = body;
     

         await MongoDb_Connect();
         const updatedEvent = await Events.findByIdAndUpdate(
            id,
            {
              $push: { comments: {name,message,likes} },
              $set: { updatedAt: new Date() }  // Update the updatedAt field
            },
            { new: true, runValidators: true }  // Return the updated document
          );

          console.log(updatedEvent);
        if(updatedEvent){
            return NextResponse.json({status:true,message:"Update Events"})
        }else{
            return NextResponse.json({status:false,message:"Not Update Events"})
        }

        return NextResponse.json({status:true,message:"Update Events"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({})
    }
}
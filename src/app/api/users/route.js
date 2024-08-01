import MongoDb_Connect from "@/lib/mongodb";
import { NextResponse } from "next/server"
import User from "../../../../models/users";
import bcrypt from "bcryptjs"

export const POST = async (req) =>{
            try {
                    await  MongoDb_Connect()
                    const {name,email,password} = await req.json();

                    const isExistEmail = await  User.findOne({email:new RegExp(`^${email}$`, 'i')})
                    
                    if(isExistEmail){
                        return NextResponse.json({status:false, message:"user alrady exists"})
                    }else{
                        const hasedPassword = await  bcrypt.hash(password, 10);                       
                         await  User.create({name,email,password:hasedPassword})
                   return NextResponse.json({status:true, message:"successfully"})
                    }

                    

                
            } catch (error) {
                return NextResponse.json({status:false, message:"server error"})
            }
}
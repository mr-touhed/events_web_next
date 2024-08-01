import MongoDb_Connect from "@/lib/mongodb";
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "../../../../../models/users";
import bcrypt from "bcryptjs"
 const authOptions = {
    // Configure one or more authentication providers
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials:{},
            async authorize(credentials){
                    
                    const {email,password} = credentials
                       await  MongoDb_Connect()
                      const exist = await  User.findOne({email:email})
                    if(exist){
                           const result = await bcrypt.compare(password, exist.password );
                           if(!result){
                            throw new Error("invalide password")
                           }else{
                                return exist
                           }
                    }else{
                        throw new Error("invalide email")
                    }
                    
            }
        })
        
      
    ],
    session:{
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60,
        updateAge: 24 * 60 * 60,
    },
    secret:process.env.NEXTAUTH_SECRET,
    pages:{
        signIn:"/login"
    }
}  

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
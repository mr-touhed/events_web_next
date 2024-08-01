import { Schema, mongoose, models } from "mongoose";

const userSchema = new Schema({
    name:{type:String, require:true},
    email: {type:String, require:true,lowercase: true},
    password: {type:String, require:true}
})


const User = models.User ||  mongoose.model("User", userSchema);

export default User
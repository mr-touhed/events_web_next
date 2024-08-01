const { default: mongoose } = require("mongoose")

const MongoDb_Connect = async () =>{
     try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connect Database......");
     } catch (error) {
        console.log("mongodb error connection", error);
     }
}

export default MongoDb_Connect
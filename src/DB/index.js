import mongoose from "mongoose";
import { DB_NAME} from "../constants.js";

const connectDB = async ()=>{
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);  // here we will store the responce inside the variable.
        console.log(`\n MongoDB connected !! DB HOST : ${connectionInstance.connection.host}`);
    } catch(error){
        console.log("MONGODB connection Error : ",error);
        // throw error; in place of this we use process
        process.exit(1); // you can read the code from documentation and gpt.
    }
}

export default connectDB
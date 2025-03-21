import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";


// Step1 : There is a chance of error        (always wrap your database in try catch)
// Step2 : Database is in another continent  (always want to async await your request)


const connectDB = async ()=> {      // async becoz database is in another continent 
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

        console.log(`\n MongoDB connected! DB host: ${connectionInstance.connection.host}`);
        
    }
    catch (error) {
        console.log("MongoDB connection error", error);     // dumping the error
        process.exit(1);            // database didn't connect so exiting the process
    }
}

export default connectDB;
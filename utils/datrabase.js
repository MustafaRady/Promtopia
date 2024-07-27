import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async()=>{
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log('Mongoose Connection Already Established');
        return;
    }
    
    try{
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:"share_prompt",
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        isConnected = true;
        console.log('Mongoose Connection Established');
    }catch(error){
        console.log('Mongoose Connection Failed');
        console.log(error);
    }
}
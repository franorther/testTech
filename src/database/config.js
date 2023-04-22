import mongoose from "mongoose";

try{
    await mongoose.connect(process.env.URI_MONGO)
    console.log("Connect to DB is 🆗");
}catch(error){
    console.log(" 🚨 Error in connection 🚨 " +  error);
}

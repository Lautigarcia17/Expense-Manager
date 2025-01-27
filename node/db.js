import mongoose from "mongoose";
import  {MONGODB_URI}  from "./config.js";


export async function connectDB() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } catch(error) {
        console.log(error);
      }
};

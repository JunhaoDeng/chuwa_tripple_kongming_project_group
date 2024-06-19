import mongoose from "mongoose";

// write your own pwd and uri 
const pwd: string = process.env.MONGODB_ATLAS_PWD || "";
const uri: string = `mongodb+srv://degjnd:${encodeURIComponent(pwd)}@cluster0.hpelqzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Call this function to connect to the mongodb atlas database
export function connect_db() {
    mongoose.connect(uri).then(() => {
        console.log("Connected");
      }).catch((err: Error) => {
        console.log(err);
      });
}


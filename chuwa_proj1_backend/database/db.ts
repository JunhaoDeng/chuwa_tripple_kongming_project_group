import mongoose from "mongoose";
const pwd: string = process.env.MONGODB_ATLAS_PWD || "";
const uri: string = `mongodb+srv://degjnd:${encodeURIComponent(pwd)}@cluster0.hpelqzn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

export function connect_db() {
    mongoose.connect(uri).then(() => {
        console.log("Connected");
      }).catch((err: Error) => {
        console.log(err);
      });
}


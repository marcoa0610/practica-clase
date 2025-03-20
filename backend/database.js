import mongoose from "mongoose";
import {config} from "./src/config.js"

mongoose.connect(config.db.URI)


//const URI = "";
const connection = mongoose.connection;

connection.once("open", ()=> {
    console.log("DB is connected");
})

connection.on("disconnected", ()=>{
    console.log("DB is disconnected");
})

connection.on("error", ()=>{
    console.log("Error in the connection");
})
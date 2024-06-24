import "dotenv/config";
import { app } from "./app.js";
import connectDB from "./db/db.js";
import {createServer} from "http";  
const server = createServer(app);
const PORT = process.env.PORT || 5000;
connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error)=>{
    console.log("Error connecting to MongoDB", error);
});
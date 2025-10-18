import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bookRoutes from "./routes/bookRoutes.js"
const app = express();
app.use(express.json());
app.use(cors());
mongoose
.connect("mongodb://127.0.0.1:27017/bookdb",{
useNewUrlParser:true,
useUnifiedTopology:true,
})
.then(()=> {
    console.log("mongoe db connected");
    
})
.catch((error)=>{
      console.error("error",error);  
    });
    

    app.use("/api/books" , bookRoutes);
    
   
    const port = 5000;
    app.listen(port,()=>{
        console.log(`server running on  port ${port}`);
    });
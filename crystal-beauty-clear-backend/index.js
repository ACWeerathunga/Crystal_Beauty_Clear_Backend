import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import userRouter from './routes/userRouter.js';
import jwt from "jsonwebtoken";
import productRouter from './routes/productRouter.js';
import orderRouter from './routes/orderRouter.js';
import dotenv from 'dotenv';
dotenv.config()

const app = express();

//mongodb+srv://Amantha:<db_password>@cluster0.ec3y1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose.connect(process.env.MONGO_URL).then(
    ()=>{
        console.log("Connected to the database");
    }
).catch(
    ()=>{
        console.log("Connection failed");
    }
)




app.use(bodyParser.json());
app.use(
    (req,res,next)=>{
        const header = req.header("Authorization");
        if(header != null){
            const token = header.replace("Bearer ","")
            jwt.verify(token,"random456",(err , decoded)=>{
                console.log(decoded)
                if(decoded != null){
                    req.user = decoded
                }
            })
        }
        next()
    }
)



app.use("/api/user" , userRouter)
app.use("/api/product", productRouter)
app.use("/api/order",orderRouter)



app.listen(5000, 
    ()=>{
        console.log("Server is running on port 5000");
    }
)
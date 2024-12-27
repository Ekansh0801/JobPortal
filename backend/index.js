import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({});
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";

const app = express();

// app.get('/home',(req,res) => {
//     return res.status(200).json({
//         success:true,
//         message:'I am coming from backend!!!'
//     })
// });
  
//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

app.use('/api/v1/user',userRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    connectDB();
    console.log(`Server running at PORT:${PORT}`)
})


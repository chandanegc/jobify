import 'express-async-errors';
import express from 'express';
const app = express();
import mongoose from "mongoose";
import jobRouter from './Router/jobRouter.js';
import errorHandlerMiddleware from './Middleware/ErrorHandler.js';
import authRouter from './Router/authRouter.js';
import cookieParser from 'cookie-parser';
import userRouter from "./Router/userRouter.js"
import {v2 as cloudinary} from 'cloudinary';

import path from 'path';

//midleware
app.use(cookieParser());
app.use(express.json());

// Router 
app.use("/api/v1/jobs" , jobRouter); 
app.use("/api/v1/auth" ,authRouter);
app.use("/api/v1/user", userRouter)

app.use(errorHandlerMiddleware);

app.use(express.static("dist")); 
 //optional

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});


cloudinary.config({
  cloud_name: 'dwv1qch0y',
  api_key: '655938423713366',
  api_secret: 'UNoANjsbKZD6Q41qTwqtm32LluE'
});

try {
    mongoose.connect("mongodb+srv://jobtracker:BBBlMdnCSQMBKbFt@cluster0.kioi2eo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
    // mongoose.connect("mongodb://127.0.0.1:27017/JonSeeker");
    app.listen(process.env.PORT || 5100 , () => {
      console.log('server running.... 5100');
    });
} catch (error) {
  console.log(error); 
  process.exit(1);
}


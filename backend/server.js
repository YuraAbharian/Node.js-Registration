import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const DB = process.env.DB;

const options = {
    useMongoClient: true,
};

mongoose.connect(DB,options, ()=>console.log(`MongoDB server is up`));

app.listen(()=>{
    console.log(`Server is up on ${port}`)
});


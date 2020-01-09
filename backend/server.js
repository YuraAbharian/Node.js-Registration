import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const DB = process.env.DB;

const options = {
    useMongoClient: true,
};

mongoose.connect(DB,options, ()=>console.log(`MongoDB server is up`));

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());

app.listen(()=>{
    console.log(`Server is up on ${port}`)
});


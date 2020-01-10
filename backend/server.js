import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import managerRoute from "./routes/managerRoute";
import ParticipantsCollections from "./Collections/ParticipantsCollections";
import ParticipantRoute from "./routes/ParticipantRoute";

dotenv.config();

const app = express();
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json());

const port = process.env.PORT || 3001;
const DB = process.env.DB;


const options = {
    useMongoClient:true,
};

mongoose.connect(DB, options, ()=>console.log(`MongoDB server is up`));


app.use(managerRoute);
app.use(ParticipantRoute);


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
    });




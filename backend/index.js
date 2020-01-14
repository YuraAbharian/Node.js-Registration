import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import managerRoute from "./routes/managerRoute";
import ParticipantRoute from "./routes/ParticipantRoute";
import userRoute from "./routes/userRoute";

dotenv.config();

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
};

mongoose.connect( 'mongodb://localhost:27017/authTest', options, ()=>console.log(`MongoDB server is up`));






app.use(managerRoute);
app.use(ParticipantRoute);
app.use(userRoute);


app.listen(  3001, () => {
    console.log(`Server is up on port ${3001}`);
});




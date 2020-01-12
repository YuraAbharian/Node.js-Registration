import express from 'express';
import  Participant  from "../Collections/ParticipantsCollections";
import {getAllDatas, registerHandler} from "../helper/helper";
const router = new express.Router();


// register participant
router.post("/apply", registerHandler(Participant, "participant" ));
// get all participants
router.get("/getParticipant",getAllDatas(Participant));



export default router;

import express from 'express';
import  Participant  from "../Collections/ParticipantsCollections";
import {getAllDatas, registerHandler} from "../helper/helper";
const router = new express.Router();


// register participant
router.post("/apply", registerHandler(Participant, "participant" ));
// get all participants
router.get("/getParticipant",getAllDatas(Participant));

router.put("/changeStatus",async (req, res)=>{
    const { id, status } = req.body;

    const participant = await Participant.findByIdAndUpdate({  _id: id });

    participant.Status = status;
    participant.save();
    res.status(200).send(participant);

});

export default router;

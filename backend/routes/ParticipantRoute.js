import express from 'express';
import  Participant  from "../Collections/ParticipantsCollections";
import {getAllDatas, mailSender, registerHandler} from "../helper/helper";
import User from "../Collections/UserCollections";
const router = new express.Router();


// register participant
router.post("/apply", registerHandler(Participant, "participant" ));
// get all participants
router.get("/getParticipant",getAllDatas(Participant));

router.put("/changeStatus",async (req, res)=>{
    const { obj, status } = req.body;
    const oldParticipant = await Participant.findById(obj._id);

    const participant = await Participant.findByIdAndUpdate({  _id: obj._id }, { $set: obj});
   try {
       await mailSender(status,await participant);
       const old = oldParticipant.Status === obj.Status;
       await res.status(200).send({statusCode:0, message: "Updated", old})
   }catch (e) {
       res.status(200).send({err: e.message, statusCode: 1})
   }

});


export default router;

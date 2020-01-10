import express from 'express';
import  Participant  from "../Collections/ParticipantsCollections";
const router = new express.Router();


// register participant
router.post("/apply", async (req, res) => {

    const participant = new Participant(await req.body);

console.log(req.body);
    try {

        const data = {
            participant,
            message: "Participant created!",
            statusCode: 0
        };

        await participant.save();

        res.status(201).send(data);

    } catch (e) {

        const data = { message: e.message, statusCode: 1 };

        res.status(400).send(data);

    }

});



export default router;

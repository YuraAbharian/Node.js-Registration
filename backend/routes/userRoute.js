import User from "../Collections/UserCollections";
import {deleteOrRestore, getAllDatas, mailSender, registerHandler} from "../helper/helper";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
const router = new express.Router();
// add user

router.post("/addUser", authMiddleware, registerHandler(User, "user" ));

// get all users
router.get("/getUser", getAllDatas(User));

// soft delete/ move to trash/ remove user with a possibility to restore
router.post("/sortDeleteUser", deleteOrRestore(User));

// remove user from collection!
router.delete("/deleteUser/:id", async (req, res)=>{
     const {id } =req.params;
     await User.findByIdAndRemove({_id: id});
     res.status(200).send({message:"User has been deleted"})
});

router.put("/update", async (req, res)=>{
      const { obj } = req.body;

     try {
         await User.updateOne({  _id: obj._id }, obj);
         res.status(200).send({message: "updated"});
     }catch (e) {
         const data = { message: e.message, statusCode: 1 };
         res.status(200).send(data);
     }

});

router.get("/getConfig", async (req, res)=>{

    res.status(200).send({
        town:await process.env.TOWN,
        from:await process.env.DATE_FROM,
        to:await process.env.DATE_TO,
        name: await  process.env.CONFERENCE_NAME,
    })

});



export default router;

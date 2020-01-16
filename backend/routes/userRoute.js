import User from "../Collections/UserCollections";
import {deleteOrRestore, getAllDatas, mailSender, registerHandler} from "../helper/helper";
import express from "express";
import { authMiddleware } from "../middleware/authMiddleware";
const router = new express.Router();
// add user

router.post("/addUser", authMiddleware, registerHandler(User, "user" ));

// get all users
router.get("/getUser",authMiddleware, getAllDatas(User));

// soft delete/ move to trash/ remove user with a possibility to restore
router.post("/sortDeleteUser",authMiddleware, deleteOrRestore(User));

// remove user from collection!
router.delete("/deleteUser/:id",authMiddleware, async (req, res)=>{
     const {id } =req.params;
    if(req.user.email !=="superAdmin@test.com" ) throw new Error("Only Super Admin can work with USERS!")
     await User.findByIdAndRemove({_id: id});
     res.status(200).send({message:"User has been deleted"})
});

router.put("/update",authMiddleware, async (req, res)=>{
      const { obj } = req.body;
    if( req.user.email !=="superAdmin@test.com" ) throw new Error("Only Super Admin can work with USERS!")

     try {
         await User.updateOne({  _id: obj._id }, obj);
         res.status(200).send({message: "updated"});
     }catch (e) {
         const data = { message: e.message, statusCode: 1 };
         res.status(200).send(data);
     }

});

router.get("/getConfig",  (req, res)=>{

    res.status(200).send({
        town: process.env.TOWN,
        from: process.env.DATE_FROM,
        to: process.env.DATE_TO,
        name:   process.env.CONFERENCE_NAME,
    })

});



export default router;

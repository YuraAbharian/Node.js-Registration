import User from "../Collections/UserCollections";
import {deleteOrRestore, getAllDatas, registerHandler} from "../helper/helper";
import express from "express";
const router = new express.Router();
// add user
router.post("/addUser",  registerHandler(User, "user" ));

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



export default router;

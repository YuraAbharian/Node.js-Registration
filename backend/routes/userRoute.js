// import User from "../Collections/UserCollections";
import {deleteOrRestore, getAllDatas, mailSender, registerHandler} from "../helper/helper";
import express from "express";
import Auth  from "../Collections/AuthenticateCollection";
import { authMiddleware } from "../middleware/authMiddleware";
const router = new express.Router();
// add user

router.post("/addUser", authMiddleware,async (req, res)=>{
    const { email } = req.body;

            switch (email) {
                case "superAdmin@test.com": {
                    req.body.isSuperAdmin = true;
                    break
                }
                default:{
                    req.body.isAdmin = true;
                }
            }
      const newAdmin = await new Auth(await  req.body);

    try {
        const data = {
            newAdmin,
            message: "created!",
            statusCode: 0
        };

        await newAdmin.save();

        res.status(201).send(data);

    } catch (e) {

        const data = {message: e.message, statusCode: 1};

        res.status(200).send(data);

    }
    });

// get all users
router.get("/getUser",authMiddleware, getAllDatas(Auth));

// soft delete/ move to trash/ remove user with a possibility to restore
router.post("/sortDeleteUser",authMiddleware, deleteOrRestore(Auth));

// remove user from collection!
router.delete("/deleteUser/:id",authMiddleware, async (req, res)=>{
     const {id } =req.params;
    if(req.user.email !=="superAdmin@test.com" ) throw new Error("Only Super Admin can work with USERS!")
     await Auth.findByIdAndRemove({_id: id});
     res.status(200).send({message:"User has been deleted"})
});

router.put("/update",authMiddleware, async (req, res)=>{
      const { obj } = req.body;
    if( req.user.email !=="superAdmin@test.com" ) throw new Error("Only Super Admin can work with USERS!");

     try {
         await Auth.updateOne({  _id: obj._id }, obj);
         res.status(200).send({message: "updated", statusCode: 0});
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

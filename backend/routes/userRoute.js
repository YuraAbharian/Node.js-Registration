import User from "../Collections/UserCollections";
import {getAllDatas, registerHandler} from "../helper/helper";
import express from "express";
const router = new express.Router();
// add user
router.post("/addUser",  registerHandler(User, "user" ));

// get all users
router.get("/getUser",getAllDatas(User));

export default router;

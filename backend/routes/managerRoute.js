import express from 'express';
import {authMiddleware} from "../middleware/authMiddleware" ;
import Auth  from "../Collections/AuthenticateCollection";
import {registerHandler} from "../helper/helper";
const router = new express.Router();



// register admin

router.get("/verify", authMiddleware, async (req, res) => {
  try {
    const data = { user: req.user, statusCode: 0, isAuth: true };
     await res.send(data);
  } catch (e) {
    const data = { message: e.message, statusCode: 1, isAuth: false };
    res.status(200).send(data);
  }
});


router.post("/register", authMiddleware, registerHandler (Auth, "admin" ));

// login
router.post("/admin", async (req, res) => {
    const { email, password } = await req.body;



    try{
        const admin = await Auth.findByCredentials(email, password);

        if(admin.isDeleted){

            const data = { message:"You have been temporarily blocked", statusCode: 1 };
            res.status(200).send(data);
            return
        }

        const token = await admin.generateAuthToken();

        const data = {
            info: admin,
            statusCode: 0,
            isAuth: true,
        };
        res.cookie('Authorization',`${ token }`, { path:'/',maxAge: 90000000 , httpOnly: true })
        .send(data);

    } catch(e) {

        const data = { message: e.message, statusCode: 1 };
        res.status(200).send(data);

    }

});


router.delete('/logout', authMiddleware, (req, res)=>{

    req.user.tokens = req.user.tokens.filter(token=>  token.token !== req.token );

    req.user.save();
    res.clearCookie("Authorization");
    const data = {message: 'You are logged out', isAuth: false};
    res.status(200).send(data)
});

export default router;

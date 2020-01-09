import express from 'express';
import authMiddleware from "../middleware/authMiddleware" ;
import Auth  from "../Collections/AuthenticateCollection";
const router = new express.Router();



// registe admin 
router.post("/register", async (req, res) => {   
    const user = new Auth(await req.body);
       try {
           const data = {
               userInfo: user,
               message: "Profile created!",
               statusCode: 0
              };
            await user.save(); 
            res.status(201).send(data);
       } catch (e) {
           const data = { message: e.message, statusCode: 1 };
           res.status(400).send(data);
       }
   });

// login
router.post("/admin", async (req, res) => {
    const { email, password } = await req.body;
 
    try{
        const admin = await Auth.findByCredentials(email, password);
        
        const token = await admin.generateAuthToken();
        
        const data = {
            info: admin,
            statusCode: 0,
            isAuth: true,
            isAdmin: email === "admin@test.com",
            isSuperAdmin: email === "superAdmin@test.com",
        };
        
        // create cookie
        //                                             way!!!!
        res.cookie('Authorization',`${ token }`, { path:'/',maxAge: 90000000 , httpOnly: true })
            .send(data);
    } catch(e) {
        const data = { message: e.message, statusCode: 1 };
        res.status(400).send(data);
    }

});

export default router;

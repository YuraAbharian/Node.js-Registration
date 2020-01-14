import express from 'express';
// import authMiddleware from "../middleware/authMiddleware" ;
import Auth  from "../Collections/AuthenticateCollection";
import {registerHandler} from "../helper/helper";
const router = new express.Router();



// register admin
// registerHandler ("/register", Participant, "admin" );
router.post("/register",registerHandler (Auth, "admin" ));

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
        };

      return res.cookie('Authorization',`${ token }`, { path:'http://localhost:3000/',maxAge: 90000000  })
            .send(data);

    } catch(e) {

        const data = { message: e.message, statusCode: 1 };
        res.status(200).send(data);

    }

});

export default router;

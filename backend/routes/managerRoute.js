import express from 'express';
import authMiddleware from "../middleware/authMiddleware" ;
import Auth  from "../Collections/AuthenticateCollection";
const router = new express.Router();


// login
router.post("/admin", async (req, res) => {
    const { Email, password } = await req.body;
    try{
        const admin = await Auth.findByCredentials(Email, password);
        const token = await admin.generateAuthToken();
        const data = {
            info: admin,
            statusCode: 0,
            isAuth: true,
            isAdmin: Email === "admin",
            isSuperAdmin: Email === "superAdmin",
        };
        // create cookie
        res.cookie('Authorization',`${ token }`, { path:'/',maxAge: 90000000 , httpOnly: true })
            .send(data);

    } catch(e) {
        const data = { message: e.message, statusCode: 1 };
        res.status(400).send(data);
    }

});

export default router;

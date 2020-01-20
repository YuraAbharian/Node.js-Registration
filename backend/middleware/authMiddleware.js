import jwt from 'jsonwebtoken';
import Auth from "../Collections/AuthenticateCollection";


export const authMiddleware = async (req, res, next) => {

    try {

        const token = req.headers.cookie.replace('Authorization=', '');

        const decode = jwt.verify(token, process.env.SECRET);

        const user = await Auth.findOne({_id: decode._id, 'tokens.token': token });
        if(!user){
            throw new Error('Please authenticate first.')
        }

        req.token = token;
        req.user = user;

        next();

    } catch (e) {
        const data = { message: e.message, statusCode: 1 };
        res.status(200).send(data);
    }
};

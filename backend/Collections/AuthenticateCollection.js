import mongoose  from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from"jsonwebtoken";


const newAuth = new mongoose.Schema({
        email:{
            type: String,
            unique: true,
            trim: true,
            required: true,
            lowercase: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is invalid!')
                }
            }
        },
        // isAdmin:{
        //     type: boolean,
        //     default:false,
        // },
        // isSuperAdmin:{
        //     type: boolean,
        //     default:false,
        // },
        password:{
            type: String,
            trim: true,
            required: true,
        },
        tokens: [{
            token: {
                type: String,
                required: true,
            }
        }]
});


// removing password and tokens from res data!
newAuth.methods.toJSON =  function () {

    const user = this;
    const userPrivat = user.toObject();

    delete userPrivat.password;
    delete userPrivat.tokens;

    return userPrivat
} ;

// relationships between schemas
// newAuth.virtual('admin',{
//         ref:'User',
//         localField:'_id',
//         foreignField:'owner'
//     }
// );

// autocreate new tokens
newAuth.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.SECRET, { expiresIn: '7 days' });
    user.tokens = [...user.tokens, token];
    // user.tokens = user.tokens.concat({ token });
     await user.save();
    return token
};

// Schema find credentials
newAuth.statics.findByCredentials = async (email, password)=>{
    const user = await Auth.findOne({ email });
    if(!user){
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
        throw new Error('Unable to login')
    }
    return user;
};

newAuth.pre('save', async function (next) {
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const Auth =  mongoose.model('Auth', newAuth);
export  default Auth;

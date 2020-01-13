import mongoose  from 'mongoose';
import validator from "validator";

const newUser = new mongoose.Schema({
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
    username:{
        type: String,
        trim: true,
        required: true,
    },
    lastname:{
        type: String,
        trim: true,
        required: true,
    },
    password:{
        type: String,
        trim: true,
        required: true
    },
    isDeleted:{
        type: Boolean,
        default: null
    }

},{timestamps: true});


export  default  mongoose.model('User', newUser);

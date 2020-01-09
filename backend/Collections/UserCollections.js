import mongoose  from 'mongoose';
import validator from "validator";

const newUser = new mongoose.Schema({
    Email:{
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
    Username:{
        type: String,
        trim: true,
        required: true,
    },
    Lastname:{
        type: String,
        trim: true,
        required: true,
    },

},{timestamps: true});


export  default  mongoose.model('User', newUser);

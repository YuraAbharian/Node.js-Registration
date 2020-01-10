import mongoose  from 'mongoose';
import validator from "validator";

const newParticipant = new mongoose.Schema({
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
    RangePicker:{
        type: Array,
        required: true,
    },
    Company:{
        type:String,
        required: true
    },
    Position:{
        type:String,
        required: true,
    },
    Role:{
        type:String,
        required: true,
    },
    Gender:{
        type: String,
        required: true
    },
    Birthdate:{
        type: Number,
        required: true
    },
    CountryPicker:{
        type:String,
        required:true
    },
    Status:{
        type:String,
        // default: "New"
    }
},{timestamps: true});


export  default  mongoose.model('Participant', newParticipant);


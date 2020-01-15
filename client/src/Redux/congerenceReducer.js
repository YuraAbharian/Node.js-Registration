import React from 'react';
import {GET_CONFIG} from "./types";

const initialState = {
  town:null,
  from:null,
  to: null,
  name: null
};
const ConferenceReducer = (state = initialState, action) => {

 switch (action.type) {

     case GET_CONFIG:{
         return  action.payload
     }

     default :{
         return state
     }

 }
};

export default ConferenceReducer;

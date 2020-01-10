import {APPLY} from "./types";

const initialState = {
        participants:[]
};

const ParticipantReducer = (state = initialState, action) => {
     switch (action.type) {
         case APPLY :{
             return {
                 ...state, participants: [...state.participants, action.payload]
             }
         }
         default:{
             return state
         }
     }
};

export default ParticipantReducer;

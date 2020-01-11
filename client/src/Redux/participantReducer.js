import {APPLY, GET_PARTICIPANT} from "./types";

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
        case GET_PARTICIPANT :{
            return {
                ...state, participants: action.payload
            }
        }

        default:{
            return state
        }
    }
};

export default ParticipantReducer;

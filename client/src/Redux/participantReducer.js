import {APPLY, GET_PARTICIPANT, CHANGE_STATUS} from "./types";

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
        case CHANGE_STATUS:{

            return {
                ...state, participants: state.participants.map(obj=>{
                    if(obj._id===action.payload.id){

                        const newParticipant = { ...obj };
                        newParticipant.Status = action.payload.status;

                        return newParticipant;
                    }
                    return obj
                })
            }
        }

        default:{
            return state
        }
    }
};

export default ParticipantReducer;

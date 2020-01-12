import {ADD_USER, DELETE_USER, GET_USER, EDIT_USER} from "./types";

const initialState = {
    user:[]
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER :{
            return {
                ...state, user: [...state.user, action.payload]
            }
        }
        case GET_USER :{
            return {
                ...state, user: action.payload
            }
        }
        case DELETE_USER :{
            return {
                ...state, user: state.user.filter(el=> el._id !== action.payload)
            }
        }
        default:{
            return state
        }
    }
};

export default userReducer;

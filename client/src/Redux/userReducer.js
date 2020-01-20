import {ADD_USER, DELETE_USER, GET_USER, EDIT_USER, REMOVE_USER} from "./types";

const initialState = {
    user:[],
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER :{

            return {
                ...state, user: [...state.user, action.payload.data.newAdmin]
            }
        }
        case GET_USER :{
            return {
                ...state, user: action.payload
            }
        }
        case DELETE_USER :{

            return {
                ...state, user: state.user.map(el=>{
                    if(el._id === action.payload.id){
                        el.isDeleted = action.payload.isDeleted
                    }
                    return el
                })
            }
        }
        case EDIT_USER :{

            return {
                ...state, user: state.user.map(el=>{
                  if(el._id === action.payload._id){
                      // console.log("true: ", { ...el, ...action.payload });
                     return { ...el, ...action.payload }
                  }
                  return el
                })
            }
        }
        case REMOVE_USER :{
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

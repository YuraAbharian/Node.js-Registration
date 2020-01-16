import {ADMIN_LOGIN, LOG_OUT, SET_ADMIN_ERROR, SET_SELECTED_AREA} from "./types";

const initialState = {
    isSuperAdmin: false,
    isAdmin: false,
    err: false,
    selectedArea: null,
};

const AdminReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADMIN_LOGIN: {
            return {
                ...state,
               ...action.payload,
            }
        }
        case LOG_OUT: {

            return {
                ...state,
                isSuperAdmin: false,
                isAdmin: false
            }
        }
        case SET_ADMIN_ERROR: {
            return {
                ...state,
                err: action.payload
            }
        }
        case SET_SELECTED_AREA: {
            return {
                ...state,
                selectedArea: action.payload
            }
        }
        default:{
            return state
        }
    }
};

export default AdminReducer;

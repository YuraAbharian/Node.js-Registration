import {ADMIN_LOGIN} from "./types";

const initialState = {
    admin: null,
    allAdmins: null,
    isSuperAdmin: false,
    isAdmin: false
};

const AdminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_LOGIN :{
            return {
                ...state,
                [action.payload.role]: action.payload.bool,
            }
        }
        default:{
            return state
        }
    }
};

export default AdminReducer;

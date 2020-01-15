import {APPLY, ADMIN_LOGIN, ADD_USER, CHANGE_STATUS, GET_USER, LOG_OUT, SET_ADMIN_ERROR, GET_PARTICIPANT, DELETE_USER, REMOVE_USER, EDIT_USER} from "./types";
import {requestHttp} from "../api/api";
import { message  } from "antd";
export const setNewError =(err)=> async dispatch=>{

    dispatch({ type:SET_ADMIN_ERROR, payload: err  })

};
// add new participant
// thunk
export const ParticipantThunk = (data) => async dispatch => {

    const newData = data.Birthdate && {
        ...data,
        RangePicker: data.RangePicker.map(el => el.unix()),
        Birthdate: data.Birthdate.unix()
    };

    await requestHttp.apply(newData);

    dispatch({type: APPLY, payload: newData});
};
// get participants thunk
export const getParticipantThunk = () => async dispatch => {
    const res = await requestHttp.getParticipant();
    dispatch({type: GET_PARTICIPANT, payload: res.data});
};


//
export const LoginAdminThunk = (data, type ) => async dispatch => {

    if(type) return dispatch({type: ADMIN_LOGIN, payload: data });

    const res = await requestHttp.logIn(data);

    switch (res.data.statusCode) {
        case 0: {
            const { isSuperAdmin, isAdmin, _id, } =res.data.info;
            localStorage.setItem('isSuperAdmin',isSuperAdmin );
            localStorage.setItem('isAdmin', isAdmin );
            localStorage.setItem('id',_id );
            dispatch({type: SET_ADMIN_ERROR, payload: null});
            dispatch({type: ADMIN_LOGIN, payload: res.data.info });
            return
        }
        case 1 :{
            // dispatch({ type: "SET_ERR", payload: res.data.message});
            message.error(res.data.message);
            return res.data.message
        }
        default: return
    }
};


export const addNewUserThunk = (data) => async dispatch => {
    const res = await requestHttp.addUser(data);
    switch (res.data.statusCode) {
        case 0: {
            dispatch({type: ADD_USER, payload: res});
            return
        }
        case 1 :{
            message.error("User with this email is already exist");
            return "User with this email is already exist"
        }
        default: return
    }

};

// get participants thunk
export const getUserThunk = () => async dispatch => {
    const res = await requestHttp.getUser();
    dispatch({type: GET_USER, payload: res.data});
};


export const deleteOrRestore =(id, isDeleted)=>async (dispatch)=>{
    await requestHttp.removeOrRestore(id, isDeleted);
    dispatch({type: DELETE_USER, payload: {id, isDeleted}})
};

export const deleteUser =(id)=>async (dispatch)=>{
    await requestHttp.deleteUser(id);
    dispatch({type: REMOVE_USER, payload: id})
};

export const UpdateUser=(obj)=>async dispatch=>{

   const res =  await requestHttp.updateUser(obj);
    switch (res.data.statusCode) {
        case 0: {
            dispatch({ type: EDIT_USER, payload: obj });
            return
        }
        case 1 :{
            message.error("User with this email is already exist");
            return 'User with this email is already exist'
        }
        default: return
    }


};
// changeStatus
export const changeStatusThunk=(id, status)=> async dispatch=>{

     await requestHttp.changeStatus(id, status);

    dispatch({ type: CHANGE_STATUS, payload: { id, status } });
};

export const logOut=(history)=>async dispatch=>{

    dispatch({ type:LOG_OUT });
    localStorage.clear();
    history.push("/");

};



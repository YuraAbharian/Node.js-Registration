import {
    APPLY,  ADMIN_LOGIN, SET_SELECTED_AREA, ADD_USER,
    GET_CONFIG, CHANGE_STATUS, GET_USER, LOG_OUT,
    SET_ADMIN_ERROR, GET_PARTICIPANT, DELETE_USER,
    REMOVE_USER,  EDIT_USER
} from "./types";
import {requestHttp} from "../api/api";
import {message} from "antd";
// import * as moment from "moment";

export const setNewError = (err) => async dispatch => {

    dispatch({type: SET_ADMIN_ERROR, payload: err})

};
// add new participant
// thunk
export const ParticipantThunk = (data) => async dispatch => {

    const newData = data.Birthdate && {
        ...data,
        RangePicker: data.RangePicker.map(el => el.unix()),
        Birthdate: data.Birthdate.unix()
    };

    const res = await requestHttp.apply(newData);
    console.log("res.data.statusCode: ", res.data.statusCode);

    switch (res.data.statusCode) {
        case 0: {
            dispatch({type: APPLY, payload: newData});
            return
        }
        case 1 : {
            message.error("User with this email is already exist");
            return 'User with this email is already exist'
        }
        default:
            return
    }


};
// get participants thunk
export const getParticipantThunk = () => async dispatch => {
    const res = await requestHttp.getParticipant();
    dispatch({type: GET_PARTICIPANT, payload: res.data});
};

export const addNewUserThunk = (data) => async dispatch => {
    const res = await requestHttp.addUser(data);
    switch (res.data.statusCode) {
        case 0: {
            dispatch({type: ADD_USER, payload: res});
            return
        }
        case 1 : {

            message.error("User with this email is already exist");
            return "User with this email is already exist"
        }
        default:
            return
    }

};
// get participants thunk
export const getUserThunk = () => async dispatch => {
    const res = await requestHttp.getUser();
    dispatch({type: GET_USER, payload: res.data});
};
export const deleteOrRestore = (id, isDeleted) => async (dispatch) => {
    await requestHttp.removeOrRestore(id, isDeleted);
    isDeleted  && message.error("User has been moved to Bin!");
    !isDeleted  && message.success("User has been restored!");

    dispatch({type: DELETE_USER, payload: {id, isDeleted}})
};
export const deleteUser = (id) => async (dispatch) => {
    await requestHttp.deleteUser(id);
    message.error("User has been removed!");
    dispatch({type: REMOVE_USER, payload: id})
};
export const UpdateUser = (obj) => async dispatch => {

    const res = await requestHttp.updateUser(obj);

    switch (res.data.statusCode) {
        case 0: {
            dispatch({type: EDIT_USER, payload: obj});
            return
        }
        case 1 : {
            message.error("User with this email is already exist");
            return 'User with this email is already exist'
        }
        default:
            return
    }


};
// changeStatus
export const changeStatusThunk = (obj, status) => async dispatch => {


    const res = await requestHttp.changeStatus(obj, status);
    if(await res.data.old) {
        message.success("Participant has been updated");
    } else if(await !res.data.old){
        message.success(`Changed participant status to: ${status}`);
    }

    dispatch({type: CHANGE_STATUS, payload: {obj, status}});
};
// logOut
export const logOut = (history) => async dispatch => {
    await requestHttp.logOut();
    dispatch({type: LOG_OUT});
    history.push("/");

};

export const getConfig = () => async dispatch => {
    const res = await requestHttp.getConfig();
    dispatch({type: GET_CONFIG, payload: res.data});
};


export const newVerifyThunk = (location,history) => async dispatch => {
    const res = await requestHttp.verify();

    // console.log("location: ", location.pathname === '/menu' && history.push("/"));
    switch (res.data.statusCode) {

        case 1: {

            if (location.pathname === '/menu') return history.push("/");
            break

        }
        default:{
            dispatch({type: ADMIN_LOGIN, payload: res.data.user});
        }

    }


};

export const LoginAdminThunk = (data, type) => async dispatch => {

    const res = await requestHttp.logIn(data);
    switch (res.data.statusCode) {
        case 0: {
            // dispatch({type: SET_ADMIN_ERROR, payload: null});
            dispatch({type: ADMIN_LOGIN, payload: res.data.info});
            return
        }
        case 1 : {
            // dispatch({ type: "SET_ERR", payload: res.data.message});
            message.error(res.data.message);
            return res.data.message
        }
        default:
            return
    }
};


export const selectedAreaThunk = (num) => async dispatch => {
    dispatch({type: SET_SELECTED_AREA, payload: num})
};

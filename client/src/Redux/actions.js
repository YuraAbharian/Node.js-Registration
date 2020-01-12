import {APPLY, ADMIN_LOGIN, ADD_USER, GET_USER, GET_PARTICIPANT} from "./types";
import {requestHttp} from "../api/api";


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
export const getParticipantThunk = (data) => async dispatch => {
    const res = await requestHttp.getParticipant();
    dispatch({type: GET_PARTICIPANT, payload: res.data});
};





export const LoginAdminThunk = (data) => async dispatch => {

    const res = await requestHttp.logIn(data);

    console.log("ADMIN_LOG_RES", res);

    dispatch({type: ADMIN_LOGIN, payload: res});

};


export const addNewUserThunk = (data) => async dispatch => {
    const res = await requestHttp.addUser(data);
    dispatch({type: ADD_USER, payload: res});
};

// get participants thunk
export const getUserThunk = (data) => async dispatch => {
    const res = await requestHttp.getUser();
    dispatch({type: GET_USER, payload: res.data});
};



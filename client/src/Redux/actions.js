import {APPLY} from "./types";
import {requestHttp} from "../api/api";


// add new participant
// thunk
export const ParticipantThunk = ( data) => async dispatch => {

    const newData = data.Birthdate && {...data, RangePicker: data.RangePicker.map(el => el.unix()), Birthdate: data.Birthdate.unix()};

    await requestHttp.apply(newData);

    dispatch({type: APPLY, payload: newData});
};

export const LoginAdminThunk = (data) => async dispatch => {

    await requestHttp.logIn(data);
    dispatch({type: APPLY, payload: data});
};



import {APPLY} from "./types";
import {requestHttp} from "../api/api";


// add new participant
// thunk
export const ParticipantThunk = ( data) => async dispatch => {

    const newData = {...data, RangePicker: data.RangePicker.map(el => el.unix()), Birthdate: data.Birthdate.unix()};

    await requestHttp.apply(newData);

    dispatch({type: APPLY, payload: newData});
};



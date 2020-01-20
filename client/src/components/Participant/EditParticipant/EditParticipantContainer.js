import React, {useContext, useEffect, useReducer} from 'react';
import {connect} from "react-redux";
import EditParticipant from "./EditParticipant";
import {
    changeStatusThunk,
    getConfig,
    getParticipantThunk,
    getUserThunk,
    selectedAreaThunk
} from "../../../Redux/actions";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {WidgetContext} from "../../../Context/Context";

const EditParticipantContainer = (props) => {
    const {participant: {participants}, match} = props;
    const {initialState, setState} = useContext(WidgetContext);
    const [state, dispatch] = useReducer(setState, initialState);
    const id = match.params.id;

    const currParticipant = participants.length > 0 && participants.find(el => el._id === id);

    const {_id,Status,  RangePicker,Company ,Position,Role, Gender, Birthdate,CountryPicker,Username,Lastname, Email } = currParticipant;

    useEffect(() => {
        participants.length > 0 && dispatch({
            type: "SET_VALUES",
            payload: {
                _id ,RangePicker,Birthdate, Company ,Position,Role, Gender, CountryPicker,Username,Lastname, Email,Status
            }
        });
    }, [participants.length, _id, Status, RangePicker,Company ,Position,Role, Gender, Birthdate,CountryPicker,Username,Lastname, Email]);



    return currParticipant ? <EditParticipant  {...props} currParticipant={currParticipant} state={state} dispatch={dispatch} buttonTitle="Participant"
                                               onForm="editParticipant"/> : null
};


const mapStateToProps = state => ({
    participant: state.participant,
    admin: state.admin,
    user: state.user,
    config: state.config
});

export default compose(connect(mapStateToProps, {
    getUserThunk,
    getParticipantThunk,
    selectedAreaThunk,
    changeStatusThunk,
    getConfig
}), withRouter)(EditParticipantContainer);




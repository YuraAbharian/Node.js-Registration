import React, {useEffect, useReducer} from 'react';
import EditUser from "./EditUser";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getParticipantThunk, getUserThunk} from "../../Redux/actions";
import {initialState, setState} from "../../functions";

const EditUserContainer = (props) =>{
    const {getUserThunk,getParticipantThunk, match:{params:{id}}, user } = props;
    const [state, dispatch] = useReducer(setState, initialState);
     const currUser = user.find(el=> el._id === id);

    useEffect(() => {
        getParticipantThunk();
         getUserThunk();
        currUser &&  dispatch({
            type: "SET_VALUES",
            payload: {
                Username: currUser.username,
                Lastname: currUser.lastname,
                Email: currUser.email,
                Password: currUser.password,
            }
        });
    }, [getParticipantThunk, getUserThunk]);


  return    <EditUser {...props} state={state} dispatch={dispatch} buttonTitle="Edit" onForm="editUser"/>

};

const mapStateToProps= state =>({
    user: state.user.user,
});
export default withRouter(connect(mapStateToProps, {getParticipantThunk, getUserThunk})(EditUserContainer));

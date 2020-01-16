import React, {useContext, useEffect, useReducer} from 'react';
import EditUser from "./EditUser";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getParticipantThunk, getUserThunk, selectedAreaThunk, UpdateUser} from "../../Redux/actions";
// import {initialState, setState} from "../../functions";
import {WidgetContext} from "../../Context/Context";

const EditUserContainer = (props) =>{

    const { initialState, setState} = useContext(WidgetContext);
    const {getUserThunk,getParticipantThunk, match:{params:{id}}, user } = props;

    const [state, dispatch] = useReducer(setState, initialState);

     const currUser = user.length > 0 && user.find(el=> el._id === id);

    useEffect(() => {
        getParticipantThunk();
        getUserThunk();
        user.length > 0 && dispatch({
            type: "SET_VALUES",
            payload: {
                _id: id,
                Username: currUser.username,
                Lastname: currUser.lastname,
                Email: currUser.email,
                Password: currUser.password,
            }
        });
    }, [getParticipantThunk, getUserThunk, currUser.email, id, currUser.password,currUser.lastname,currUser.username, user.length]);


  return  <EditUser {...props} state={state} dispatch={dispatch}  buttonTitle="Edit" onForm="editUser"/>

};

const mapStateToProps= state =>({
    user: state.user.user,
});

export default withRouter(connect(mapStateToProps, {selectedAreaThunk, getParticipantThunk, getUserThunk, UpdateUser})(EditUserContainer));


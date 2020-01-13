import React, {useReducer} from 'react';
import { Form} from "antd";
import "./User.css";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {fromCreator, initialState, setState} from "../../functions";

const EditUser = (props) => {




    return (
        <div className="edit__user">
            {fromCreator(props, props.dispatch, props.state, alert  )}
        </div>
    );
};


const WrappedNormalLoginForm = Form.create({name: 'normal_login'});

export default compose(WrappedNormalLoginForm, withRouter)(EditUser);

//  { fromCreator(props, dispatch, state, props.addNewUserThunk )}

// <UserWindow buttonTitle="Add User" ParticipantThunk={currentThunk} state={state}
// getFieldDecorator={props.form.getFieldDecorator}/>

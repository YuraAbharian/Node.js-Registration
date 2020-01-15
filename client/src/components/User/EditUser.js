import React from 'react';
import { Form} from "antd";
import "./User.css";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {fromCreator} from "../../functions";

const EditUser = (props) => {
    return (
        <div className="edit__user">
            {fromCreator(props, props.dispatch, props.state, props.UpdateUser  )}
        </div>
    );
};


const WrappedNormalLoginForm = Form.create({name: 'normal_login'});

export default compose(WrappedNormalLoginForm, withRouter)(EditUser);

import React, {useReducer} from 'react';
import {fromCreator, initialState, setState} from "../../functions";
import {Form} from "antd";
import "./User.css";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

const User = (props) => {
    const [state, dispatch] = useReducer(setState, initialState);

    return (
        <div className="user__form__container">
            { fromCreator(props, dispatch, state, props.addNewUserThunk )}
        </div>
    );
};

const WrappedNormalLoginForm = Form.create({name: 'normal_login'});

export default compose(WrappedNormalLoginForm, withRouter)(User);

import React, {useContext, useReducer} from 'react';
// import {fromCreator, initialState, setState} from "../../functions";
import {Form} from "antd";
import "./User.css";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {WidgetContext} from "../../Context/Context";

const User = (props) => {

    const { initialState, setState, fromCreator } = useContext(WidgetContext);
    const [state, dispatch] = useReducer(setState, initialState);

    return (
        <div className="user__form__container">
            { fromCreator(props, dispatch, state, props.addNewUserThunk, props.selectedAreaThunk )}
        </div>
    );
};

const WrappedNormalLoginForm = Form.create({name: 'normal_login'});

export default compose(WrappedNormalLoginForm, withRouter)(User);

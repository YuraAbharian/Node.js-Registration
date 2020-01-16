import React, {useContext, useReducer} from 'react';
// import {fromCreator, initialState, setState} from "../../functions";
import "./Admin.css";
import {Form} from "antd";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {WidgetContext} from "../../Context/Context";

const Admin = (props) => {

    const { initialState, setState, fromCreator } = useContext(WidgetContext);

    const [state, dispatch] = useReducer(setState, initialState);

    return (
        <div className="admin__form__container">
            { fromCreator(props ,dispatch,  state, props.LoginAdminThunk )}
        </div>
    );
};


const WrappedNormalLoginForm = Form.create({name: 'normal_login'});

export default compose(WrappedNormalLoginForm, withRouter)(Admin);


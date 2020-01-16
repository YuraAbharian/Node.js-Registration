import React, {useContext} from 'react';
import { Form} from "antd";
import "./User.css";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
// import {fromCreator} from "../../functions";
import {WidgetContext} from "../../Context/Context";

const EditUser = (props) => {

    const { fromCreator } = useContext(WidgetContext);
    return (
        <div className="edit__user">
            {fromCreator(props, props.dispatch, props.state, props.UpdateUser , props.selectedAreaThunk )}
        </div>
    );
};


const WrappedNormalLoginForm = Form.create({name: 'normal_login'});

export default compose(WrappedNormalLoginForm, withRouter)(EditUser);

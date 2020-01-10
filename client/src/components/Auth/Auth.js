import React, {useReducer} from 'react';
import "./Auth.css";
import {Form} from "antd";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {fromCreator, initialState, setState} from "../../functions";


const Auth = (props) => {



    const [state, dispatch] = useReducer(setState, initialState);

    const { ParticipantThunk} = props;

    return (
        <div className="form_container">

            { fromCreator(props ,dispatch,  state, ParticipantThunk )}
        </div>
    );
};

const WrappedNormalLoginForm = Form.create({name: 'normal_login'});

export default compose(WrappedNormalLoginForm, withRouter)(Auth);


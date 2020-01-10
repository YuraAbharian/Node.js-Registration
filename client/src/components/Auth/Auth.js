import React, {useReducer} from 'react';
import "./Auth.css";
import {Form, Button,  /*Checkbox*/} from "antd";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import FirstWindow from "./StepMenu/AuthWindows/FirstWindow";
import SecondWindow from "./StepMenu/AuthWindows/SecondWindow";
import {fromCreator, onSendButtonHandler, setState} from "../../functions";


const Auth = (props) => {


    const initialState = {
        errors: {
            Birthdate: {
                errors: []
            },
            RangePicker: {
                errors: []
            },
            Gender: {
                errors: []
            },
            CountryPicker: {
                errors: []
            }
        },
        values: null
    };

    const [state, dispatch] = useReducer(setState, initialState);

    const {from, form: {getFieldDecorator, validateFields}, stateHandler, ParticipantThunk, done, onForm, buttonTitle, confirmEmail, messageSuccess, stepsState} = props;



    const doneHandler = () => {
        dispatch({type: "RESET_ERR"});
        validateFields((err, values)=>   dispatch({type: "SET_VALUES", payload: values}) );
        stateHandler()
    };

    const handleSubmit = e => {

        e.preventDefault();
        validateFields((err, values) => {

            if (!err) {

                dispatch({type: "SET_VALUES", payload: values});

                onSendButtonHandler(buttonTitle, ParticipantThunk, {...values, ...state.values });
                // buttonTitle === "Previous" && ParticipantThunk(values);
                stateHandler(stepsState);
            } else if (err) {

                dispatch({type: "SET_ERR", payload: err});
                messageSuccess.error("Fill all required fields!");
                return;
            }
            onSendButtonHandler(buttonTitle, done );
            // buttonTitle === "Previous" && done();

            onSendButtonHandler(buttonTitle, messageSuccess.success,`Processing complete!${confirmEmail}`  );

            // buttonTitle === "Previous" && messageSuccess.success(`Processing complete!${confirmEmail}`);

        });
    };

    return (
        <div className="form_container">
            { fromCreator(handleSubmit, props ,dispatch, doneHandler, state, ParticipantThunk)}
        </div>
    );
};
const WrappedNormalLoginForm = Form.create({name: 'normal_login'});

export default compose(WrappedNormalLoginForm, withRouter)(Auth);


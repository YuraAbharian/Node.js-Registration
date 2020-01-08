import React, {useReducer} from 'react';
import "./Auth.css";
import {Form, Button, /*Checkbox*/} from "antd";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import FirstWindow from "./StepMenu/AuthWindows/FirstWindow";
import SecondWindow from "./StepMenu/AuthWindows/SecondWindow";
import {setState} from "../../functions";


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
            }
        }

    };
    const [state, dispatch] = useReducer(setState, initialState);
    const {form: {getFieldDecorator, validateFields}, stateHandler, done, onForm, buttonTitle, confirmEmail, messageSuccess, stepsState} = props;


    const handleSubmit = e => {
        e.preventDefault();

        validateFields((err, values) => {

            dispatch({type: "SET_ERR", payload: err});
            if (!err) {
                stateHandler(stepsState)
            } else {
                messageSuccess.error("Fill all required fields!")
            }

            stepsState === 1 && done();
            stepsState === "done" && messageSuccess.success(`Processing complete!${confirmEmail}`)
        });
    };

    return (
        <div className="form_container">
            <Form onSubmit={handleSubmit} className="login-form">

                {onForm === "First" && <FirstWindow getFieldDecorator={getFieldDecorator}/>}
                {onForm === "Second" &&
                <SecondWindow state={state} messageSuccess={messageSuccess} validateFields={validateFields}
                              dispatch={dispatch} getFieldDecorator={getFieldDecorator}/>}
                <Form.Item>
                    <div className="form_bottom_navigation">

                        {buttonTitle === "Previous" && <Button type="primary" htmlType="submit"
                           className="login-form-button done_button">
                            Done
                        </Button>}
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            {buttonTitle}
                        </Button>

                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};
const WrappedNormalLoginForm = Form.create({name: 'normal_login'});
// export default withRouter(WrappedNormalLoginForm);
export default compose(WrappedNormalLoginForm, withRouter)(Auth);


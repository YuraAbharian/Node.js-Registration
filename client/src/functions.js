import {Button, Form, Icon, Input} from "antd";
import React from "react";

export const antdInput = (getFieldDecorator, key,styles)=>{
    return (<Form.Item style={styles}>
        {getFieldDecorator([key], {
            rules: [{required: true, message: `Please input your ${key}!`}],
        })(
            <Input
                prefix={<Icon type={ key === "Email" ? "google" : "user" } style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder={[key.toLowerCase()]}
            />,
        )}
    </Form.Item>)
};


export const setState=(state, action)=>{
    switch (action.type) {
        case "SET_ERR": {
            return {
                ...state, errors: action.payload
            }
        }
        case "ON_CHANGE_ERR":{
            return {
                ...state, errors: {...state.errors, ...action.payload}
            }
        }
        default:{
            return state;
        }

    }
};


export const authFormHandler=(onForm, handleSubmit,state, dispatch, messageSuccess, getFieldDecorator, validateFields, stepButton, buttonTitle, Component )=>{
   return( <Form onSubmit={handleSubmit} className="login-form">

        <Component state={state} messageSuccess={messageSuccess} validateFields={validateFields}
                      dispatch={dispatch} getFieldDecorator={getFieldDecorator}/>
        <Form.Item>
            <div className="form_bottom_navigation">

                {buttonTitle === "Previous" && <Button type="primary" htmlType="submit"
                                                       className="login-form-button done_button">
                    Done
                </Button>}
                <Button type="primary" htmlType="submit" onClick={stepButton} className="login-form-button">
                    {buttonTitle}
                </Button>

            </div>
        </Form.Item>
    </Form>)
};

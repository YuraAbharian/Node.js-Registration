import {  Form, Icon, Input} from "antd";
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
                ...state, errors: action.payload ? {...state.errors, ...action.payload} : state
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



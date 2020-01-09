import {  Form, Icon, Input} from "antd";
import React from "react";

export const antdInput = (getFieldDecorator, key, styles, state)=>{
    // console.log(state)
    // const typesOf= key === "Email" ? "email" : null;
    const currState = state.values && state.values[key] ? state.values[key] : '';

    return (<Form.Item style={styles}>
        {getFieldDecorator([key], {
            initialValue: currState,
            rules: [{required: true, message: `Please input your ${key}!`}],
        })(
            <Input

                prefix={<Icon type={ key === "Email" ? "google" : "user" } style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder={[key.toLowerCase()]}
            />,
        )}
    </Form.Item>)
};













// reducers
export const setState=(state, action)=>{
    switch (action.type) {
        case "SET_ERR": {

            return {
                ...state, errors: action.payload ? {...state.errors, ...action.payload} : state
            }
        }
        case "RESET_ERR": {

            return {
                ...state, errors:   new Map(
                    Object.entries(state.errors).map(
                        ([key, value]) => [key, value=null]
                    )
                )
                    // state.errors.forEach(obj =>  )
            }
        }
        case "ON_CHANGE_ERR":{
            return {
                ...state, errors: {...state.errors, ...action.payload}
            }
        }
        case "SET_VALUES":{
            return {
                ...state, values: !state.values ? action.payload : { ...state.values, ...action.payload }
            }
        }
        default:{
            return state;
        }

    }
};



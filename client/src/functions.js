import {  Form, Icon, Input} from "antd";
import React from "react";

// isTrue
export const isTrueHandler=(state, name)=>  state.errors[name] && state.errors[name].errors.length > 0;

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


// inputs
export const antdInput = (getFieldDecorator, key, styles, state)=>{ 
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

// component selector
export const selectorHandler=(getFieldDecorator, name, initVal, isTrue, holder, types, dispatch, cn, arr , Component, ComponentTwo, countryList  )=>{
     const countryArr = typeof arr === "string" ? countryList().getData() : arr;
   
     return getFieldDecorator(name, {
       initialValue: initVal,
       rules: [{ required: true, message: `Please choose your ${holder}!` }]
     })(
       <Component
         showSearch={true}
         className={cn("", { "has-error": isTrue })}
         onChange={() =>
           dispatch({
             type: types,
             payload: { [name]: { errors: [] } }
           })
         }
         placeholder={[holder]}
         optionFilterProp="children"
         filterOption={(input, option) =>
           option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
         }
       >
         {countryArr.map(
           (el, i) =>  (
               <ComponentTwo key={i} value={el.label.toLowerCase()}>
                 {el.label}
               </ComponentTwo>
             )
         )}
       </Component>
     );

   
}
// errors
export const showError = (isTrue, state, cn, name, oldStyle = "") => {
  return isTrue && state.errors[name].errors[0].message ? (
    <span className={cn(oldStyle, { errFont: isTrue })}>
      {state.errors[name].errors[0].message}
    </span>
  ) : null;
};


// pickers 
export const Pickers=(getFieldDecorator, name, isTrue, state, dispatch, cn, Component, moment, dateFormat, oldStyle=''  )=>{
    const disabledDates =(day)=>  name === "Birthdate" ?  day.isAfter(moment()) :
      day < moment().add(0, "month") || day.isAfter(moment().add(1, "months"));
    
  return( getFieldDecorator([name], {
        initialValue: state.values[name] && state.values[name],
        rules: [{required: true, message: `Please indicate your ${name}!`}],
    })(<Component
        disabledDate={ disabledDates }
        format={dateFormat}
        className={cn( oldStyle, {'has-error': (isTrue)})}
        showToday={false}
        placeholder={name} onChange={() => dispatch({
            // ranges={{
            //         Today: [moment(), moment()],
            //         'This Month': [moment().startOf('month'), moment().endOf('month')],
            //     }}
        type: "ON_CHANGE_ERR", payload: { [name]: {errors: []}}
    })}/>))
}

  
import {Button, Form, Icon, Input} from "antd";
import React from "react";
import FirstWindow from "./components/StepMenu/AuthWindows/FirstWindow";
import SecondWindow from "./components/StepMenu/AuthWindows/SecondWindow";
import AdminWindow from "./components/Admin/AdminWindow";
import UserWindow from "./components/User/UserWindow";
import ThirdWindows from "./components/StepMenu/AuthWindows/ThirdWindows";

// isTrue
export const isTrueHandler = (state, name) => state.errors[name] && state.errors[name].errors.length > 0;
// state
export const initialState = {
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
// reducers
export const setState = (state, action) => {
    switch (action.type) {
        case "SET_ERR": {

            return {
                ...state, errors: action.payload ? {...state.errors, ...action.payload} : state
            }
        }
        case "RESET_ERR": {

            return {
                ...state, errors: new Map(
                    Object.entries(state.errors).map(
                        ([key, value]) => [key, value = null]
                    )
                )
            }
        }
        case "ON_CHANGE_ERR": {
            return {
                ...state, errors: {...state.errors, ...action.payload}
            }
        }
        case "SET_VALUES": {
            return {
                ...state, values: !state.values ? action.payload : {...state.values, ...action.payload}
            }
        }
        default: {
            return state;
        }
    }
};
// inputs
export const antdInput = (getFieldDecorator, key, styles, state) => {
    const currState = state.values && state.values[key] ? state.values[key] : '';
    return (<Form.Item style={styles}>
        {getFieldDecorator([key], {
            initialValue: currState,
            rules: [{required: true, message: `Please input your ${key}!`}],
        })(
            <Input
                type={key === "Password" ? "password" : key === "Email" ? "email" : "text"}
                prefix={<Icon type={key === "Email" ? "google" : key === "Password" ? "eye-invisible" : "user"}
                              style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder={[key.toLowerCase()]}
            />,
        )}
    </Form.Item>)
};
// component selector
export const selectorHandler = (getFieldDecorator, name, initVal, isTrue, holder, types, dispatch, cn, arr, Component, ComponentTwo, countryList) => {
    const countryArr = typeof arr === "string" ? countryList().getData() : arr;

    return getFieldDecorator(name, {
        initialValue: initVal,
        rules: [{required: true, message: `Please choose your ${holder}!`}]
    })(
        <Component
            showSearch={true}
            className={cn("", {"has-error": isTrue})}
            onChange={() =>
                dispatch({
                    type: types,
                    payload: {[name]: {errors: []}}
                })
            }
            placeholder={[holder]}
            optionFilterProp="children"
            filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
        >
            {countryArr.map(
                (el, i) => (
                    <ComponentTwo key={i} value={el.label.toLowerCase()}>
                        {el.label}
                    </ComponentTwo>
                )
            )}
        </Component>
    );


};
// errors
export const showError = (isTrue, state, cn, name, oldStyle = "") => {
    return isTrue && state.errors[name].errors[0].message ? (
        <span className={cn(oldStyle, {errFont: isTrue})}>
           {state.errors[name].errors[0].message}
        </span>
    ) : null;
};
// pickers
export const Pickers = (getFieldDecorator, name, isTrue, state, dispatch, cn, Component, moment, dateFormat, oldStyle = '') => {
    const disabledDates = (day) => name === "Birthdate" ? day.isAfter(moment()) :
        day < moment().add(0, "month") || day.isAfter(moment().add(1, "months"));

    return (getFieldDecorator([name], {
        initialValue: state.values[name] && state.values[name],
        rules: [{required: true, message: `Please indicate your ${name}!`}],
    })(<Component
        disabledDate={disabledDates}
        format={dateFormat}
        className={cn(oldStyle, {'has-error': (isTrue)})}
        showToday={false}
        placeholder={name} onChange={() => dispatch({
        type: "ON_CHANGE_ERR", payload: {[name]: {errors: []}}
    })}/>))
};

export const onSendButtonHandler = (buttonTitle, key, values) => {

    const val = values ? values : '';
    return (buttonTitle === "Previous" ? key(val) : buttonTitle === "Login" ? key(val) : key);
};
// handler submit
const handleSubmit = (e, props, Thunk, dispatch, state,) => {

    const isButtonTrue = props.buttonTitle === "Next" || props.buttonTitle === "Previous";
    e.preventDefault();
    props.form.validateFields((err, values) => {

        if (!err) {

            dispatch({type: "SET_VALUES", payload: values});

            // onSendButtonHandler(props.buttonTitle, Thunk, {...values, ...state.values});

            props.buttonTitle === "Previous" && Thunk({...values, ...state.values});
            props.buttonTitle === "Login" && Thunk({...values, ...state.values});
            props.buttonTitle === "User" && Thunk({...values, ...state.values});
            console.log("BUTTON", props.buttonTitle);
            props.stateHandler && props.stateHandler(props.stepsState);
        } else if (err) {

            dispatch({type: "SET_ERR", payload: err});
            isButtonTrue && props.messageSuccess.error("Fill all required fields!");
            return;
        }
        isButtonTrue && onSendButtonHandler(props.buttonTitle, props.done);

        isButtonTrue && onSendButtonHandler(props.buttonTitle, props.messageSuccess.success, `Processing complete!${props.confirmEmail}`)

    });
};

const doneHandler = (dispatch, props) => {
    dispatch({type: "RESET_ERR"});
    props.form.validateFields((err, values) => dispatch({type: "SET_VALUES", payload: values}));
    props.stateHandler()
};

// button
const formButton = (props, styles = '', name) => (
    <Button type="primary" htmlType="submit" className={`login-form-button ${styles}`}>
        {!name ? props.buttonTitle : name}
    </Button>);

// form creator
export const fromCreator = (props, dispatch, state, currentThunk) => {


    const isPrevious = props.buttonTitle === "Previous";
    const isNext = props.buttonTitle === "Next";


    return (<Form onSubmit={(e) => handleSubmit(e, props, currentThunk, dispatch, state)} className="login-form">

        {
            props.onForm === "First" && <FirstWindow form={props.form} state={state} getFieldDecorator={props.form.getFieldDecorator}/>

        }

        {
            props.onForm === "Second" && <SecondWindow ParticipantThunk={currentThunk} state={state} messageSuccess={props.messageSuccess}
                      validateFields={props.form.validateFields}  form={props.form} dispatch={dispatch} getFieldDecorator={props.form.getFieldDecorator}/>}



        {
            props.onForm === "Third" && <ThirdWindows {...props} state={state} />

        }



        {
            props.onForm === "admin" &&
            <AdminWindow buttonTitle="Login" ParticipantThunk={currentThunk} state={state}
                         getFieldDecorator={props.form.getFieldDecorator}/>
        }
        {
            props.onForm === "user" &&
            <UserWindow buttonTitle="Add User" ParticipantThunk={currentThunk} state={state}
                        getFieldDecorator={props.form.getFieldDecorator}/>
        }

        <Form.Item>
            <div className="form_bottom_navigation">

                {
                    isPrevious ? formButton(props, "done_button", "Done") : props.buttonTitle === "Login" ?
                        formButton(props, '', null) : props.buttonTitle === "User" ?
                            formButton(props, '', null)
                            : null
                }

                {isPrevious &&
                <Button type="primary" onClick={() => doneHandler(dispatch, props)} className="login-form-button">
                    {props.buttonTitle}
                </Button>}
                {
                    isNext ? formButton(props, '', null) : null
                }
            </div>
        </Form.Item>
    </Form>)
};



<<<<<<< HEAD

import {Button, Form, Icon, Input,  Tag, Divider} from "antd";

=======
 
import {Button, Form, Icon, Input, Card, Tag, Divider} from "antd";
 
>>>>>>> cb92cefca0c854692de1dcc6f485ca74fabc1a50
import React from "react";
import FirstWindow from "./components/StepMenu/AuthWindows/FirstWindow";
import SecondWindow from "./components/StepMenu/AuthWindows/SecondWindow";
import AdminWindow from "./components/Admin/AdminWindow";
import UserWindow from "./components/User/UserWindow";
import ThirdWindows from "./components/StepMenu/AuthWindows/ThirdWindows";
 
import { NavLink } from "react-router-dom";
 



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
            console.log("action.payload: ", action.payload);
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
    const inputType =key === "Password" ? "password" : key === "Email" ? "email" : "text";
<<<<<<< HEAD
    const emailValid = key === "Email" ? "email": null;
=======
>>>>>>> cb92cefca0c854692de1dcc6f485ca74fabc1a50
    const currState = state.values && state.values[key] ? state.values[key] : '';

    if(state.values && !state.values.Email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3,})$/i)){
       return console.log("true: ", true);
    }
    return (<Form.Item style={styles}>
        {getFieldDecorator([key], {
            initialValue: currState,
            rules: [{
                type:emailValid, message: 'The input is not valid E-mail!',
            },{required: true,  message: `Please input your ${key}!`}]
        })(
            <Input
                autoComplete="new-password"
                type={inputType}
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
            props.buttonTitle === "Edit" && Thunk("err");
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
    const isEditUser =  props.onForm === "editUser";

    const switchCaser = () => {
        switch (props.onForm) {
            case "First":{
                return <FirstWindow form={props.form} state={state} getFieldDecorator={props.form.getFieldDecorator}/>
            }
            case "Second":{
                return <SecondWindow ParticipantThunk={currentThunk} state={state} messageSuccess={props.messageSuccess}
                                     validateFields={props.form.validateFields} form={props.form} dispatch={dispatch}
                                     getFieldDecorator={props.form.getFieldDecorator}/>
            }
            case "Third":{
                return <ThirdWindows {...props} state={state}/>
            }
            case "admin":{
                return  <AdminWindow buttonTitle="Login" ParticipantThunk={currentThunk} state={state}
                                     getFieldDecorator={props.form.getFieldDecorator}/>
            }
            case "user":{
                return  <UserWindow buttonTitle="Add User" ParticipantThunk={currentThunk} state={state}
                                    getFieldDecorator={props.form.getFieldDecorator}/>
            }
            case "editUser":{
                return  <UserWindow buttonTitle="Edit" ParticipantThunk={currentThunk} state={state}
                                    getFieldDecorator={props.form.getFieldDecorator}/>
            }
            default:{
                return <FirstWindow form={props.form} state={state} getFieldDecorator={props.form.getFieldDecorator}/>
            }
        }
    };

    return (<Form onSubmit={(e) => handleSubmit(e, props, currentThunk, dispatch, state)} className="login-form">

                            {switchCaser()}

{/*here mus be !!*/}

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
                {
                    isEditUser ? formButton(props, '', null) : null
                }
            </div>
        </Form.Item>
    </Form>)
};

<<<<<<< HEAD
// ant table columns
=======
 

// map user or paticipants

export const chooseCurrentRole=(name, key )=>{
   return name.length > 0 && name.map(el=> ( <div className="card__mapping" key={el._id}>
    <Card title={key ? `${el.Username} ${el.Lastname}` : `${el.username} ${el.lastname}`} bordered={false} style={{ width: 300 }}>
   {  key &&  <p>{el.Company}</p>}
   {  key &&  <p>{el.Position}</p>}
   {  key &&  <p>{el.Country}</p>}
   {  key ?   <p>{el.Email}</p> :  <p>{el.email}</p> }
   {  key &&  <p>{ new Date(el.createdAt).toLocaleString() }</p>}
   {  key &&  <p>{el.Status ? el.Status: "New"}</p>}
    </Card>
</div>)
) 
}
// ant table columns 
>>>>>>> cb92cefca0c854692de1dcc6f485ca74fabc1a50
// participant
export const newColumns = [
    {
      title: 'Fullname',
      dataIndex: 'fullname',
      key: 'fullname',
      render: text =><span>{text}</span>,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
    },
    {
      title: 'Registration date',
      dataIndex: 'registration',
      key: 'registration',
    },
    {
      title: 'Status',
      key: 'tags',
      dataIndex: 'tags',
      render: tags => (
        <span>
          {tags.map(tag => {
              let newTag = tag ? tag : 'new';
            let color = newTag === "New" || !newTag ? 'geekblue' : tag === "Approved " ? 'green' : tag === "Declined " ? 'volcano': null;
             return (
              <Tag color={color} key={newTag}>
                {newTag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    ];
<<<<<<< HEAD

export const newColumnsUser = (name, func, delFunc, history)=>{
=======
// user
export const newColumnsUser = (name)=>{
>>>>>>> cb92cefca0c854692de1dcc6f485ca74fabc1a50
    return [
        {
        title: 'Fullname',
        dataIndex: 'fullname',
        key: 'fullname',
        render: text =><span>{text}</span>,
      },
      {
        title: 'Email',
        dataIndex: 'email',
<<<<<<< HEAD
        key: 'email',
=======
        key: 'email', 
>>>>>>> cb92cefca0c854692de1dcc6f485ca74fabc1a50
      },
    {
        title: 'Action',
        key: 'action',
<<<<<<< HEAD
        render: (text, el) =>  {
            console.log("el: ", el)
           return name !== "Bin" ? (
             <span>
               <Button onClick={()=>  history.push(`/menu/editUser/${el.key}`) }>Edit</Button>
               <Divider type="vertical" />
               <Button onClick={()=>func(el.key, true)}>Delete</Button>
             </span>
           ) : (
             <span>
               <Button onClick={()=>func(el.key, null)}>Restore</Button>
                  <Divider type="vertical" />
                 <Button onClick={()=>delFunc(el.key)}>Delete</Button>
             </span>
           );
               }
      },
    ]
};
const filterHandler=(array, bool)=>array.filter(el=>el.isDeleted === bool);
export const chooseCurrentRoles =(arr, name)=>{

    const isTrue = name === "Participants";
    const isUser = name === "Users";
    const isBin = name === "Bin";

    const newArr =isTrue?  arr : isUser ? filterHandler(arr, null) : isBin ? filterHandler(arr, true): null;

   return newArr.map(el=>{

        const Status = isTrue &&  el.Status ? `${el.Status}` : "new";
        let Country= isTrue && el.CountryPicker[0].toUpperCase() + el.CountryPicker.slice(1);

        const date =  new Date(el.createdAt).toLocaleString();
         return   !isTrue ? {
            key: el._id,
            fullname: `${el.username} ${el.lastname}`,
            email: `${el.email}`,
         } : {
=======
        render: (text, record) => {
           return name !== "Bin" ? (
             <span>
               <NavLink to="/edit">Edit</NavLink>
               <Divider type="vertical" />
               <NavLink to="/delete">Delete</NavLink>
             </span>
           ) : (
             <span>
               <NavLink to="/delete">Delete</NavLink>
             </span>
           ); 
               } 
      },
    ]
}

export const chooseCurrentRoles =(arr, name)=>{
   return arr.map(el=>{
            
        const Status = name === "Participants" &&  el.Status ? `${el.Status}` : "new";
        let Country= name === "Participants" && el.CountryPicker[0].toUpperCase() + el.CountryPicker.slice(1); 

        const date =  new Date(el.createdAt).toLocaleString()
         return   name !== "Participants" ? {
            key: el._id,
            fullname: `${el.username} ${el.lastname}`,
            email: `${el.email}`,
         } : {               
>>>>>>> cb92cefca0c854692de1dcc6f485ca74fabc1a50
                key: el._id,
                fullname: `${el.Username} ${el.Lastname}`,
                company: `${el.Company}`,
                position: `${el.Position}`,
                email: `${el.Email}`,
                country: `${Country}`,
                registration: date,
                tags: [Status],
<<<<<<< HEAD
              }
    });
};




//{
//props.onForm === "First" &&
//<FirstWindow form={props.form} state={state} getFieldDecorator={props.form.getFieldDecorator}/>
//}
//
//{
//props.onForm === "Second" &&
//<SecondWindow ParticipantThunk={currentThunk} state={state} messageSuccess={props.messageSuccess}
//  validateFields={props.form.validateFields} form={props.form} dispatch={dispatch}
//  getFieldDecorator={props.form.getFieldDecorator}/>}
//{
//props.onForm === "Third" && <ThirdWindows {...props} state={state}/>
//}
//
//{
//props.onForm === "admin" &&
//<AdminWindow buttonTitle="Login" ParticipantThunk={currentThunk} state={state}
//  getFieldDecorator={props.form.getFieldDecorator}/>
//}
//{
//props.onForm === "user" &&
//<UserWindow buttonTitle="Add User" ParticipantThunk={currentThunk} state={state}
//  getFieldDecorator={props.form.getFieldDecorator}/>
//}
//{
//  isEditUser &&
//            <UserWindow buttonTitle="Edit" ParticipantThunk={currentThunk} state={state}
//  getFieldDecorator={props.form.getFieldDecorator}/>
//}
=======
              } 
    });
};
 
>>>>>>> cb92cefca0c854692de1dcc6f485ca74fabc1a50

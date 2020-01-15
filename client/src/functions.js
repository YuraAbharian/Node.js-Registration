import {Button, Form, Icon, Input,  Tag, Divider} from "antd";
import React from "react";
import FirstWindow from "./components/StepMenu/AuthWindows/FirstWindow";
import SecondWindow from "./components/StepMenu/AuthWindows/SecondWindow";
import AdminWindow from "./components/Admin/AdminWindow";
import UserWindow from "./components/User/UserWindow";
import ThirdWindows from "./components/StepMenu/AuthWindows/ThirdWindows";
import moment from "moment";



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
        case "RESET_VALUES": {
            return {
                ...state, values: null
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
    const emailValid = key === "Email" ? "email": null;
    const currState = state.values && state.values[key] ? state.values[key] : '';
    // const  Validation = key === "Email" ? "/^([\\w.%+-]+)@([\\w-]+\\.)+([\\w]{3,})$/i" : key === "Lastname" || key === "Username" ? "/^[A-Z][a-z0-9_-]{3,19}$/": "";
    let Val;
    switch (key) {

        case "Lastname" :{
            Val = "^[A-Z]+[a-zA-Z]*$";
            break
        }
        case "Username" :{
            Val = "^[A-Z]+[a-zA-Z]*$";
            break
        }

        default :{
            Val='';
        }

    }
    if(state.values && !state.values.Email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{3,})$/i)){
       return
    }

    return (<Form.Item style={styles}>
        {getFieldDecorator([key], {
            initialValue: currState,
            rules: [{
                pattern: Val,
                type:emailValid, message: `The input is not valid ${key}`,
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
const handleSubmit =  (e, props, Thunk, dispatch, state) => {
    const isButtonTrue = props.buttonTitle === "Next" || props.buttonTitle === "Previous";
    e.preventDefault();
    props.form.validateFields(async(err, values) => {
        if (!err) {
            dispatch({type: "SET_VALUES", payload: values});
            // onSendButtonHandler(props.buttonTitle, Thunk, {...values, ...state.values});
            switch (props.buttonTitle) {
                case "Previous": {
                    const response = await Thunk({...values, ...state.values});

                    if(typeof response !== "string"){
                       props.done()
                    }
                    return
                }
                case "Login":{
                    const response = await Thunk({...values, ...state.values},false);

                    if(typeof response !== "string"){
                        props.history.push("/menu");
                    } else {
                        dispatch({type: "RESET_VALUES"});
                    }

                    return
                }
                case "User":{
                    const response = await Thunk({...values, ...state.values});

                    if(typeof response === "string"){
                        dispatch({type: "RESET_VALUES"});
                    }

                    return
                }

                case "Edit":{
                    const toLowerCase = Object.keys(values).reduce((obj, k) => (obj[k.toLowerCase()] = values[k], obj), {});
                    const response = await Thunk({...toLowerCase, _id:state.values._id});

                    if(typeof response === "string"){
                        dispatch({type: "RESET_VALUES"});
                    }

                    return

                }
                default:{

                }
            }

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
// send participant info
const doneHandler = (dispatch, props) => {
    dispatch({type: "RESET_ERR"});
    props.form.validateFields((err, values) => dispatch({type: "SET_VALUES", payload: values}));
    props.stateHandler();

};
// button
const formButton = (props, styles = '', name) =>{

    // const clickHandler=()=> (name === "Done") ? props.done(): null;
    return (
        <Button type="primary"  htmlType="submit" className={`login-form-button ${styles}`}>
            {!name ? props.buttonTitle : name}
        </Button>)
};

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

            }
        }
    };

    return (<Form onSubmit={(e) => handleSubmit(e, props, currentThunk, dispatch, state )} className="login-form">
                            {switchCaser()}
        <Form.Item>
            <div className="form_bottom_navigation">

                {
                    isPrevious ? formButton(props, "done_button", "Done") :   props.buttonTitle === "Login" || props.buttonTitle === "User" ?
                            formButton(props, '', null)
                            : null
                }



                {isPrevious &&
                <Button type="primary" onClick={() => doneHandler(dispatch, props)} className="login-form-button">
                    { props.buttonTitle}
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

// ant table columns
// participant
export const newColumns =(sortedInfo, getColumnSearchProps)=>   [
    {
      title: 'Fullname',
      dataIndex: 'fullname',
      key: 'fullname',
        sorter: (a, b) => a.fullname.localeCompare(b.fullname),
            // a.fullname - b.fullname,
        sortOrder: sortedInfo.columnKey === 'fullname' && sortedInfo.order,
        ellipsis: true,
        ...getColumnSearchProps("fullname"),
      render: text =><span>{text}</span>,
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
        sorter: (a, b) => a.company.localeCompare(b.company),
            // a.company.length - b.company.length,
        sortOrder: sortedInfo.columnKey === 'company' && sortedInfo.order,

        ellipsis: true,
        ...getColumnSearchProps("company"),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
        sorter: (a, b) => a.position.localeCompare(b.position),
        // a.company.length - b.company.length,
        sortOrder: sortedInfo.columnKey === 'position' && sortedInfo.order,
        ellipsis: true
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
        sorter: (a, b) => a.email.localeCompare(b.email),
        // a.company.length - b.company.length,
        sortOrder: sortedInfo.columnKey === 'email' && sortedInfo.order,
        ...getColumnSearchProps("email"),
        ellipsis: true

    },
    {
      title: 'Country',
      dataIndex: 'country',
      key: 'country',
        sorter: (a, b) => a.country.localeCompare(b.country),
        // a.company.length - b.company.length,
        sortOrder: sortedInfo.columnKey === 'country' && sortedInfo.order,
        ellipsis: true
    },
    {
      title: 'Registration date',
      dataIndex: 'registration',
      key: 'registration',
        sorter: (a, b) => moment((new Date(a.registration))).unix()- moment(new Date(b.registration) ).unix(),
        sortOrder: sortedInfo.columnKey === 'registration' && sortedInfo.order,
        ellipsis: true

    },
    {
      title: 'Status',
      key: 'tags',
        filters: [
            {
                text: 'New',
                value: 'New',
            },
            {
                text: 'Approve',
                value: 'Approve',
            },
            {
                text: 'Decline',
                value: 'Decline',
            }
            ],
      dataIndex: 'tags',
        sorter: (a, b) =>  a.tags[0].localeCompare(b.tags[0]),
        // ,

        sortOrder: sortedInfo.columnKey === 'tags' && sortedInfo.order,
        onFilter: (value, record) => record.tags.indexOf(value) === 0,
        ellipsis: true,
      render: tags => (
        <span>
          {tags.map(tag => {
              let newTag = tag ? tag : 'new';
            let color = newTag === "New" ? 'geekblue' : tag === "Approve" ? 'green' : tag === "Decline" ? 'volcano': null;
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

export const newColumnsUser = (name, func, delFunc, history)=>{
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
        key: 'email',
      },
    {
        title: 'Action',
        key: 'action',
        render: (text, el) =>  {

           return name !== "Bin" ? (
             <span>
               <Button  onClick={()=>  history.push(`/menu/editUser/${el.key}`) }>Edit</Button>
               <Divider type="vertical" />
               <Button className="decline" onClick={()=>func(el.key, true)}>Delete</Button>
             </span>
           ) : (
             <span>
               <Button  className="approve" onClick={()=>func(el.key, null)}>Restore</Button>
                  <Divider type="vertical" />
                 <Button  className="decline" onClick={()=>delFunc(el.key)}>Delete</Button>
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
                key: el._id,
                fullname: `${el.Username} ${el.Lastname}`,
                company: `${el.Company}`,
                position: `${el.Position}`,
                email: `${el.Email}`,
                country: `${Country}`,
                registration: date,
                tags: [Status],
              }
    });
};



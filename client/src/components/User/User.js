import React, {useCallback, useEffect,useContext, useReducer} from 'react';
// import {fromCreator, initialState, setState} from "../../functions";
import { Form,  Modal} from "antd";
import "./User.css";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {WidgetContext} from "../../Context/Context";

const User = (props) => {

    const { initialState, setState, fromCreator, onEscapePress, onClickHandler } = useContext(WidgetContext);
    const [state, dispatch] = useReducer(setState, initialState);

    onEscapePress(useCallback, useEffect, props, 1);
    return (

        <div  >


    <Modal
        key={"add__user"}
        visible={props.store.visible}
        // title="Title"
        title={"Add User"} className="add__user"
        // onOk={this.handleOk}
        footer={null}
        onCancel={() => {
            onClickHandler(props, 1);
            props.setState({
                ...props.store,
                show: "Users",
                visible: false,
            });
            props.history.push("/menu")
        }}

    >
            { fromCreator(props, dispatch, state, props.addNewUserThunk, props.selectedAreaThunk, "formModify", "headerModify" )}
    </Modal>

       </div>
    );
};

const WrappedNormalLoginForm = Form.create({name: 'normal_login'});

export default compose(WrappedNormalLoginForm, withRouter)(User);

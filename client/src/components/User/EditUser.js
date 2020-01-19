import React, {useContext, useCallback, useEffect} from 'react';
import {Form,  Modal} from "antd";
import "./User.css";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
// import {fromCreator} from "../../functions";
import {WidgetContext} from "../../Context/Context";

const EditUser = (props) => {

    const { fromCreator, onEscapePress, onClickHandler } = useContext(WidgetContext);
    const {currUser, setState,store} = props;
    onEscapePress(useCallback, useEffect, props, 1 );


    return (


            <Modal
                key={currUser._id}
                visible={store.visible}
                title={currUser.username + ' ' + currUser.lastname}
                footer={null}
                onCancel={() => {
                    onClickHandler(props, 1);
                    setState({
                        ...store,
                        show: "Users",
                        visible: false,
                    })

                }}

            >
                {fromCreator(props, props.dispatch, props.state, props.UpdateUser , props.selectedAreaThunk   )}

            </Modal>





    );
};


const WrappedNormalLoginForm = Form.create({name: 'normal_login'});

export default compose(WrappedNormalLoginForm, withRouter)(EditUser);

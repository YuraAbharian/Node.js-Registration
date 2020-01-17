import React, {useCallback, useEffect,useContext, useReducer} from 'react';
// import {fromCreator, initialState, setState} from "../../functions";
import {Card, Form, Icon} from "antd";
import "./User.css";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
import {WidgetContext} from "../../Context/Context";

const User = (props) => {

    const { initialState, setState, fromCreator, onEscapePress, onClickHandler } = useContext(WidgetContext);
    const [state, dispatch] = useReducer(setState, initialState);

    onEscapePress(useCallback, useEffect, props, 1)
    return (
        <div className="user__form__container">

            <Card className="edit__user___wrapper"
                  extra={<Icon onClick={()=>onClickHandler(props, 1)} type={"close"}
                               style={{color: 'rgba(0,0,0,.25)'}}/>}
            >
            { fromCreator(props, dispatch, state, props.addNewUserThunk, props.selectedAreaThunk, "formModify", "headerModify" )}
            </Card>
        </div>
    );
};

const WrappedNormalLoginForm = Form.create({name: 'normal_login'});

export default compose(WrappedNormalLoginForm, withRouter)(User);

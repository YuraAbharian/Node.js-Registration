import React, {useContext, useCallback, useEffect} from 'react';
import { Form, Card, Icon} from "antd";
import "./User.css";
import {compose} from "redux";
import {withRouter} from "react-router-dom";
// import {fromCreator} from "../../functions";
import {WidgetContext} from "../../Context/Context";

const EditUser = (props) => {

    const { fromCreator, onEscapePress, onClickHandler } = useContext(WidgetContext);

    onEscapePress(useCallback,useEffect, props, 1 );


    return (
        <div className="edit__user">

            <Card className="edit__user___wrapper"
                  extra={<Icon onClick={()=>onClickHandler(props, 1)} type={"close"}
                               style={{color: 'rgba(0,0,0,.25)'}}/>}
            >
    {fromCreator(props, props.dispatch, props.state, props.UpdateUser , props.selectedAreaThunk, "formModify", "headerModify" )}



</Card>
        </div>
    );
};


const WrappedNormalLoginForm = Form.create({name: 'normal_login'});

export default compose(WrappedNormalLoginForm, withRouter)(EditUser);

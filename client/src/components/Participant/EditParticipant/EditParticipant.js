import React, { useEffect, useCallback, useContext, useState } from 'react';
import {    Form, Modal} from "antd";
import "../Participant.css";
// import moment from "moment"
import { WidgetContext } from '../../../Context/Context';
import {compose} from "redux";
import {withRouter} from "react-router-dom";


const EditParticipant = (props) => {
const [show, setShow] = useState(false);
    const {currParticipant, setState,store} = props;

    const { onEscapePress, onClickHandler,fromCreator} = useContext(WidgetContext);

    onEscapePress(useCallback, useEffect, props, 2);

    // const toUpCase = (el) => {
    //     return el[0].toUpperCase() + el.slice(1);
    // };


    return currParticipant ? (
        <div >
            <Modal
                key={currParticipant._id}
                visible={store.visible}
                // title="Title"
                title={currParticipant.Username + ' ' + currParticipant.Lastname} className="participantEdit"
                // onOk={this.handleOk}
                footer={null}
                onCancel={() => {

                    onClickHandler(props, 2);
                    setState({
                        ...store,
                        show: "Participants",
                        visible: false,
                    });
                    props.history.push("/menu")
                }}

            >

                {fromCreator(props, props.dispatch, props.state, props.changeStatusThunk , props.selectedAreaThunk ,'','',show, setShow)}
            </Modal>
        </div>) : null
};

const WrappedNormalLoginForm = Form.create({name: 'normal_login'});

export default compose(WrappedNormalLoginForm, withRouter)(EditParticipant);

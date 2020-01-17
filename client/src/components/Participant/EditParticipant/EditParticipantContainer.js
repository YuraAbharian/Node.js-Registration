 import React, {useEffect} from 'react';
 import { connect } from "react-redux";
 import EditParticipant from "./EditParticipant";
 import {changeStatusThunk, getParticipantThunk, selectedAreaThunk} from "../../../Redux/actions";
 import {withRouter} from "react-router-dom";
 import {compose} from "redux";

 const EditParticipantContainer = (props) => {
     const {getParticipantThunk, participant:{ participants }, match} = props;
     const id =  match.params.id;

     useEffect(()=>{
        //  getParticipantThunk()
     },[]);


   const currParticipant = participants.find(el => el._id === id);

     return  currParticipant ? <EditParticipant currParticipant={currParticipant} {...props}/> :null
 };


const mapStateToProps= state =>({
    participant: state.participant,
});

export default compose(connect(mapStateToProps, {getParticipantThunk, selectedAreaThunk, changeStatusThunk}), withRouter)(EditParticipantContainer);




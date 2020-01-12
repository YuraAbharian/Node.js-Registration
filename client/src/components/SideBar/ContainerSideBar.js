import React, {useEffect} from 'react';
import SideBar from "./SideBar";
import {connect} from "react-redux";
import {getParticipantThunk, getUserThunk} from "../../Redux/actions";

const ContainerSideBar = (props) => {
    const { admin: {isSuperAdmin}, getParticipantThunk, getUserThunk } = props;
    console.log('isSuperAdmin :', isSuperAdmin);
    useEffect(()=>{
        getParticipantThunk();
        getUserThunk();
    },[getParticipantThunk, getUserThunk]);
    return (
        <div>
            <SideBar {...props}/>
        </div>
    );
};
const mapStateToProps =state=>({
    admin: state.admin,
    user: state.user,
    participant: state.participant
});
export default connect(mapStateToProps, {getParticipantThunk, getUserThunk})(ContainerSideBar);

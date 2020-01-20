import React, {useEffect} from 'react';
import SideBar from "./SideBar";
import {connect} from "react-redux";
import {deleteOrRestore, deleteUser, getParticipantThunk, getUserThunk, selectedAreaThunk} from "../../Redux/actions";
import {withRouter} from "react-router-dom";

const ContainerSideBar = (props) => {

    const { getParticipantThunk, getUserThunk} = props;

    useEffect(() => {
        getParticipantThunk();
        getUserThunk();
    }, []);



    return (
        <div>
            <SideBar  {...props}/>
        </div>
    );
};

const mapStateToProps = state => ({
    admin: state.admin,
    user: state.user,
    participant: state.participant
});

export default withRouter(connect(mapStateToProps, {getParticipantThunk, selectedAreaThunk, getUserThunk,deleteUser, deleteOrRestore})(ContainerSideBar));

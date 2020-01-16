import React, {useEffect} from 'react';
import SideBar from "./SideBar";
import {connect} from "react-redux";
import {deleteOrRestore, deleteUser, getParticipantThunk, getUserThunk} from "../../Redux/actions";
import {withRouter} from "react-router-dom";

const ContainerSideBar = (props) => {

    const { getParticipantThunk, getUserThunk, admin:{isSuperAdmin,isAdmin }, history} = props;

    useEffect(() => {
        getParticipantThunk();
        getUserThunk();

        (isSuperAdmin || isAdmin ?  history.push("/menu") :   history.push("/"))

    }, [isSuperAdmin, isAdmin]);


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

export default withRouter(connect(mapStateToProps, {getParticipantThunk, getUserThunk,deleteUser, deleteOrRestore})(ContainerSideBar));

import React, {useEffect} from 'react';
import SideBar from "./SideBar";
import {connect} from "react-redux";
import {deleteOrRestore, deleteUser, getParticipantThunk, getUserThunk} from "../../Redux/actions";

const ContainerSideBar = (props) => {

    const { getParticipantThunk, getUserThunk} = props;



    useEffect(() => {
        getParticipantThunk();
        getUserThunk();
    }, []);
    // }, [getParticipantThunk, getUserThunk]);

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

export default connect(mapStateToProps, {getParticipantThunk, getUserThunk,deleteUser, deleteOrRestore})(ContainerSideBar);

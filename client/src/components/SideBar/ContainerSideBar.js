import React, {useEffect} from 'react';
import SideBar from "./SideBar";
import {connect} from "react-redux";
import {deleteOrRestore, deleteUser, getParticipantThunk, getUserThunk} from "../../Redux/actions";

const ContainerSideBar = (props) => {
<<<<<<< HEAD

    const {admin: {isSuperAdmin}, getParticipantThunk, getUserThunk} = props;



    useEffect(() => {
        getParticipantThunk();
        getUserThunk();
    }, [getParticipantThunk, getUserThunk]);

=======
    const { admin: {isSuperAdmin}, getParticipantThunk, getUserThunk } = props;
    console.log('isSuperAdmin :', isSuperAdmin);
    useEffect(()=>{
        getParticipantThunk();
        getUserThunk();
    },[getParticipantThunk, getUserThunk]);
>>>>>>> cb92cefca0c854692de1dcc6f485ca74fabc1a50
    return (
        <div>
            <SideBar {...props}/>
        </div>
    );
};

const mapStateToProps = state => ({
    admin: state.admin,
    user: state.user,
    participant: state.participant
});

export default connect(mapStateToProps, {getParticipantThunk, getUserThunk,deleteUser, deleteOrRestore})(ContainerSideBar);

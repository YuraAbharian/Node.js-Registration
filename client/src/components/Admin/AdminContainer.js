import React, { useEffect } from 'react';
import Admin from "./Admin";
import {connect} from "react-redux";
import {LoginAdminThunk} from "../../Redux/actions";
import {withRouter} from "react-router-dom";

const AdminContainer = (props) => {
    const { location, history,admin :{ isAdmin,  isSuperAdmin} } = props;
    useEffect(()=>{

        if( location.pathname === '/admin' ){
            if( isAdmin || isSuperAdmin ){
                history.push('/menu')
            }

        }
    },[isAdmin, isSuperAdmin]);

    return <Admin buttonTitle="Login" onForm="admin" {...props}/>;
};

const mapStateToProps = state =>({
    admin: state.admin
});
export default withRouter(connect(mapStateToProps, {LoginAdminThunk})(AdminContainer));

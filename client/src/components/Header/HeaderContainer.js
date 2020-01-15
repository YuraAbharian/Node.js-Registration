import React, { useEffect } from 'react';
import Header from "./Header";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {LoginAdminThunk, logOut} from "../../Redux/actions";

const HeaderContainer = (props) => {
const { LoginAdminThunk, history } = props;
    useEffect(()=>{
       const id = localStorage.getItem('id');
       const Admin = localStorage.getItem('isAdmin');
       const SuperAdmin = localStorage.getItem('isSuperAdmin');

       const isAdmin = typeof  Admin === "string" ? Admin !== "false": null;
       const isSuperAdmin = typeof SuperAdmin === "string" ? SuperAdmin !== "false": null;

       // [isSuperAdmin,isAdmin].some(el=> (el===true) ? history.push("/menu") : null  );
       LoginAdminThunk({id, isAdmin, isSuperAdmin}, 'relogin');


    },[LoginAdminThunk,history]);
    // },[LoginAdminThunk,history]);


    return   <Header {...props}/>

};
const mapStateToProps = state=>({
    admin: state.admin
});
export default withRouter(connect(mapStateToProps, {LoginAdminThunk, logOut})(HeaderContainer));

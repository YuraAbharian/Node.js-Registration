import React, { useEffect } from 'react';
import Header from "./Header";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getConfig, newVerifyThunk, logOut} from "../../Redux/actions";

const HeaderContainer = (props) => {

const { newVerifyThunk,  history, location , getConfig } = props;
    useEffect(()=>{

        newVerifyThunk(location,history);
        getConfig();



    },[]);



    return   <Header {...props}/>

};
const mapStateToProps = state=>({
    admin: state.admin
});
export default withRouter(connect(mapStateToProps, {getConfig, newVerifyThunk, logOut})(HeaderContainer));

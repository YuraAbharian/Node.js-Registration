import React, { useEffect } from 'react';
import Header from "./Header";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getConfig, newVerifyThunk, logOut} from "../../Redux/actions";

const HeaderContainer = (props) => {
const { newVerifyThunk, history, getConfig } = props;
    useEffect(()=>{
        

      const res = newVerifyThunk()
      console.log('res :', res);
    // if(isSuperAdmin || isAdmin) history.push("/menu");
       
     

        getConfig()
    },[]);
    // },[LoginAdminThunk,history]);


    return   <Header {...props}/>

};
const mapStateToProps = state=>({
    admin: state.admin
});
export default withRouter(connect(mapStateToProps, {getConfig, newVerifyThunk, logOut})(HeaderContainer));

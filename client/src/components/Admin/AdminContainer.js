import React from 'react';
import Admin from "./Admin";
import {connect} from "react-redux";
import {LoginAdminThunk} from "../../Redux/actions";

const AdminContainer = (props) => <Admin buttonTitle="Login" onForm="admin" {...props}/>;

const mapStateToProps = state =>({
    admin: state.admin
});
export default connect(mapStateToProps, {LoginAdminThunk})(AdminContainer);

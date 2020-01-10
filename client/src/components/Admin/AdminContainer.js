import React from 'react';
import Admin from "./Admin";
import {connect} from "react-redux";
import {LoginAdminThunk} from "../../Redux/actions";

const AdminContainer = (props) => <Admin buttonTitle="Login" onForm="admin" {...props}/>;

export default connect(null, {LoginAdminThunk})(AdminContainer);

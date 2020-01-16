import React from 'react';
import User from "./User";
import {connect} from "react-redux";
import {addNewUserThunk, selectedAreaThunk} from "../../Redux/actions";

const UserContainer = (props) => <User buttonTitle="User" onForm="user" {...props}/>;

export default connect(null,{addNewUserThunk, selectedAreaThunk})(UserContainer);

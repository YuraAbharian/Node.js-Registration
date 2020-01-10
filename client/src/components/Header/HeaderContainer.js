import React from 'react';
import Header from "./Header";
import {withRouter} from "react-router-dom";

const HeaderContainer = (props) =>  <Header {...props}/>;

export default withRouter(HeaderContainer);

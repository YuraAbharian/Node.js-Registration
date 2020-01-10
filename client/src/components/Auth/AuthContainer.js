import React from 'react';
import Auth from "./Auth";
import {connect} from "react-redux";
import {ParticipantThunk} from "../../Redux/actions";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

const AuthContainer = (props) => <Auth {...props}/>;

export default compose(connect(null, { ParticipantThunk }), withRouter)(AuthContainer);

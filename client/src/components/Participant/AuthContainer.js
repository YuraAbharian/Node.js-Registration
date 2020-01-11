import React from 'react';
import Participant from "./Participant";
import {connect} from "react-redux";
import {ParticipantThunk} from "../../Redux/actions";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

const AuthContainer = (props) => <Participant {...props}/>;

export default compose(connect(null, { ParticipantThunk }), withRouter)(AuthContainer);

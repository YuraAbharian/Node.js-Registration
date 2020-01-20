import React from 'react';
import Participant from "./Participant";
import {connect} from "react-redux";
import {ParticipantThunk} from "../../Redux/actions";
import {compose} from "redux";
import {withRouter} from "react-router-dom";

const ParticipantContainer = (props) => <Participant   {...props}/>;

const mapStateToProps =state =>({
    config: state.config,
});
export default compose(connect(mapStateToProps, { ParticipantThunk }), withRouter)(ParticipantContainer);

import React from 'react';
import {connect} from "react-redux";
import Conference from "./Conference";

const ConferenceContainer = (props) => {
    return (
        <div>
            <Conference {...props}/>
        </div>
    );
};

const mapStateToProps = state => ({
    config: state.config,
});

export default connect(mapStateToProps, {})(ConferenceContainer);

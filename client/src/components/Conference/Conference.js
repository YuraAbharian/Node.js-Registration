import React from 'react';
import "./Conference.css";
import moment from "moment";
import {Button} from "antd";
import {withRouter} from "react-router-dom";

const Conference = (props) => {


    return (
        <div className="conference__container">
            <h2>{`Apply and visit ${props.config.name} conference at ${props.config.town}.`}</h2>
            <p>{`We’ll be very happy if you want to be a part of ${props.config.name}. The conference will be held 
            between ${moment(props.config.from).format("LL")} - ${moment(props.config.to).format("LL")} . The ${props.config.name} crowd is carefully curated to ensure a
                unique experience with a diverse crowd. Registering is very easy: fill simple form
                below and apply for a ticket.`}</p>
          <Button onClick={()=>props.history.push("/apply")} key="1">Apply</Button>
        </div>
    );
};

export default withRouter(Conference);

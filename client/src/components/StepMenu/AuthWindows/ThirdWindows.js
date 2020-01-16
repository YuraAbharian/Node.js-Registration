import React from 'react';
import {NavLink} from "react-router-dom";

const ThirdWindows = (props) => {
    const { state: { values: { Username, Email, Lastname } } } = props

    return (
        <div className="third__window">
            <span>  Dear,<span className="names">{`  ${Username}`}</span>   <span className="names">{`${Lastname}`}</span>. We'd sent a message on your email ${Email}.
             Please confirm your email by following the link in the message. </span>
            <NavLink to="/"> Back to main page </NavLink>
        </div>
    );
};

export default ThirdWindows;

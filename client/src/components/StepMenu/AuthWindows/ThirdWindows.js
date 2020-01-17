import React from 'react';
import {NavLink} from "react-router-dom";

const ThirdWindows = (props) => {
    const { state: { values: { Username, Email, Lastname } } } = props

    return (
        <div className="third__window">
            <span>  Dear,<span className="names">{`  ${Username}`}</span>
                <span className="names">{`   ${   Lastname}`}</span>. After our admins will check your form, we  would send you a message on you email:
                <span className="names emails">{` ${ Email }`}</span>.
            </span>
            <NavLink to="/"> Back to main page </NavLink>
        </div>
    );
};

export default ThirdWindows;

// Dear Andrew after our admins will check the form, we  would send you a message on you email.

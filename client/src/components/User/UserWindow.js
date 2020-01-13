import React from 'react';
import {antdInput} from "../../functions";

const UserWindow = (props) => {
    const {getFieldDecorator, state} = props;
    return (
        <div>

            <div className="form_container_header" >
                <h1>User</h1>
            </div>

            {antdInput(getFieldDecorator,'Username','', state)}
            {antdInput(getFieldDecorator,'Lastname','', state)}
            {antdInput(getFieldDecorator,'Email','', state)}
            {antdInput(getFieldDecorator,'Password','', state )}

        </div>
    );
};

export default UserWindow;


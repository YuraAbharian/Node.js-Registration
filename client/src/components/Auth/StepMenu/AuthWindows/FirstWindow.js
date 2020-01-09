import React from 'react';
import {antdInput} from "../../../../functions";


const FirstWindow = (props) => {

    const {getFieldDecorator, state} = props;

    return (
        <div>
            <div className="form_container_header" >
                <h1>SingUp</h1>
            </div>
            {antdInput(getFieldDecorator,'Username','', state )}

            {antdInput(getFieldDecorator,'Lastname','', state )}
            {antdInput(getFieldDecorator,'Email','', state)}
        </div>
    );
};

export default FirstWindow;

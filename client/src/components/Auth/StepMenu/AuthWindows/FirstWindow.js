import React from 'react';
import {antdInput} from "../../../../functions";


const FirstWindow = (props) => {

    const {getFieldDecorator} = props;
    return (
        <div>
            {/*<div className="form_container_header" >*/}
            {/*    <h1>SingUp</h1>*/}
            {/*</div>*/}
            {antdInput(getFieldDecorator,'Username' )}
            {antdInput(getFieldDecorator,'Lastname' )}
            {antdInput(getFieldDecorator,'Email')}
        </div>
    );
};

export default FirstWindow;

import React, {useContext} from 'react';
// import {antdInput} from "../../../functions";
import {WidgetContext} from "../../../Context/Context";


const FirstWindow = (props) => {

    const {getFieldDecorator, state} = props;

    const { antdInput } = useContext(WidgetContext);
    return (
        <div>
            <div className="form_container_header" >
                <h1>Apply</h1>
            </div>
            {antdInput(getFieldDecorator,'Username','', state )}
            {antdInput(getFieldDecorator,'Lastname','', state )}
            {antdInput(getFieldDecorator,'Email','', state)}
        </div>
    );
};

export default FirstWindow;

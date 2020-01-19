import React, {useContext} from 'react';
// import {antdInput} from "../../functions";
import {WidgetContext} from "../../Context/Context";

const UserWindow = (props) => {
    const {getFieldDecorator, state, headerModify} = props;

    const {antdInput} = useContext(WidgetContext);

    return (
        <div>

            <div className={`form_container_header ${headerModify}`}>
                {/*<h1>User</h1>*/}
            </div>

            {antdInput(getFieldDecorator, 'Username', '', state)}
            {antdInput(getFieldDecorator, 'Lastname', '', state)}
            {antdInput(getFieldDecorator, 'Email', '', state)}
            {antdInput(getFieldDecorator, 'Password', '', state)}

        </div>
    );
};

export default UserWindow;


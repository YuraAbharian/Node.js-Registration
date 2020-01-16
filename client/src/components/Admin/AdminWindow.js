import React, {useContext} from 'react';
// import {antdInput} from "../../functions";
import {WidgetContext} from "../../Context/Context";

const AdminWindow = (props) => {

    const {getFieldDecorator, state} = props;

    const {antdInput} = useContext(WidgetContext);

    return (
        <div>
            <div className="form_container_header">
                <h1>Admin</h1>
            </div>
            {antdInput(getFieldDecorator, 'Email', '', state)}
            {antdInput(getFieldDecorator, 'Password', '', state)}

        </div>
    );
};

export default AdminWindow;

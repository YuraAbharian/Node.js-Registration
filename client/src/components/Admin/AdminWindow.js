import React from 'react';
import {antdInput} from "../../functions";

const AdminWindow = (props) => {
    const {getFieldDecorator, state} = props;
    return (
        <div>
            <div className="form_container_header" >
                <h1>Admin</h1>
            </div>
            {antdInput(getFieldDecorator,'Email','', state)}
            {antdInput(getFieldDecorator,'Password','', state )}

        </div>
    );
};

export default AdminWindow;

import React from 'react';
import 'antd/dist/antd.css';
import { PageHeader, Button } from 'antd';


const Header = (props) => {
const { history } = props;
    return (
        <PageHeader
            style={{
                border: '1px solid rgb(235, 237, 240)',
            }}
            title="Title"
            extra={[
                <Button onClick={()=>history.push("/apply")} key="3">Apply</Button>,
                <Button key="2">SingUp</Button>,
                <Button key="1">LogOut</Button>,
            ]}
        >
        </PageHeader>
    );
};

export default Header;

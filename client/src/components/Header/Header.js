import React from 'react';
import 'antd/dist/antd.css';
import { PageHeader, Button } from 'antd';


const Header = () => {

    return (
        <PageHeader
            style={{
                border: '1px solid rgb(235, 237, 240)',
            }}
            title="Title"
            extra={[
                <Button key="3">LogIn</Button>,
                <Button key="2">SingUp</Button>,
                <Button key="1">LogOut</Button>,
            ]}
        >
        </PageHeader>
    );
};

export default Header;

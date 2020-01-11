import React from 'react';
import 'antd/dist/antd.css';
import { PageHeader, Button } from 'antd';
import "./Header.css"


const Header = (props) => {
const { history } = props;
const onTitleHandler=e=>{
    if(e.target.className==="ant-page-header-heading-title"){
        return history.push("/")
    }
};
    return (
      <div onClick={onTitleHandler}>
          <PageHeader
              style={{
                  border: '1px solid rgb(235, 237, 240)',
              }}
              title="Title"
              extra={[
                  <Button onClick={()=>history.push("/apply")} key="1">Apply</Button>,
                  <Button onClick={()=>history.push("/user")} key="2">User</Button>,
                  <Button onClick={()=>history.push("/admin")} key="3">Admin</Button>,
              ]}
          >
          </PageHeader>
      </div>
    );
};

export default Header;

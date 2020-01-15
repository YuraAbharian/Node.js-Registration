import React from 'react';
import 'antd/dist/antd.css';
import { PageHeader, Button } from 'antd';
import "./Header.css"
const Header = (props) => {
const { history, admin:{isAdmin, isSuperAdmin} } = props;



const onTitleHandler=e=>{
    if(e.target.className==="ant-page-header-heading-title"){
        if(isAdmin || isSuperAdmin)return history.push("/menu");
        return history.push("/");
    }
};

    return (
      <div onClick={onTitleHandler}>
          <PageHeader
              className="page__header"
              title="Home"
              extra={[

               // (!isSuperAdmin && !isAdmin && <Button onClick={()=>history.push("/apply")} key="1">Apply</Button>),

                 ( isSuperAdmin && <Button onClick={()=>history.push("/user")} key="2">Add User</Button>),

                  (  !isSuperAdmin  &&  !isAdmin ? null : <Button onClick={()=>props.logOut(history)} key="3">LogOut</Button>)

              ]}
          >
          </PageHeader>
      </div>
    );
};

export default Header;

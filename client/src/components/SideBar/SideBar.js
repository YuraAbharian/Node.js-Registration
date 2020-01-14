import React, {useState} from 'react';
import "./SideStyle.css";

import {Layout, Menu, Icon, Table } from 'antd';
import { chooseCurrentRoles, newColumns, newColumnsUser } from '../../functions';
import {withRouter} from "react-router-dom";

const { Sider, Content } = Layout;

const SideBar = (props) =>  {
    const { participant: {participants},admin: {isSuperAdmin}, user:{user}, deleteOrRestore,deleteUser, history } = props;


    const [state, setState] = useState({ collapsed: true, show: '' });

    const isParticipant = state.show ==="Participants";
    const isUser = state.show ==="Users";
    const isBin = state.show ==="Bin";
    const isSuperAdminTrue = isSuperAdmin ;

    const columns = isParticipant ? newColumns : newColumnsUser(state.show, deleteOrRestore, deleteUser, history);

        const newData = isParticipant ?  chooseCurrentRoles(participants, "Participants") :
         isUser ? chooseCurrentRoles(user, "Users") : isBin ? chooseCurrentRoles(user, "Bin") : [];

    const toggle = (e) => {
        if(e.target.className !== "ant-layout-sider-children" ) return null;
        setState({...state, collapsed: !state.collapsed });
    };
        return (
            <Layout className="side-bar__wrapper" >
                <Sider collapsible onClick={toggle} collapsed={state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" >
                       { isSuperAdminTrue ?  <Menu.Item key="1" onClick={()=>setState({...state, show: "Users"}) }>
                            <Icon type="user" />
                            <span>Users</span>
                        </Menu.Item> : null}
                        <Menu.Item key="2" onClick={()=>setState({...state, show: "Participants"})}>
                            <Icon type="qq" />
                            <span>Participants</span>
                        </Menu.Item>
                      { isSuperAdminTrue ? <Menu.Item key="3" onClick={()=>setState({...state, show: "Bin"})}>
                            <Icon type="rest" />
                            <span>Bin</span>
                        </Menu.Item> : null}
                    </Menu>
                </Sider>
                <Layout>

                    <Content className="content__wrapper">

                           {  state.show &&   <Table columns={columns}  dataSource={newData}  />}

                    </Content>
                </Layout>
            </Layout>
        );
};


export default  withRouter(SideBar)

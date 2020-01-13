import React, {useState} from 'react';
import "./SideStyle.css";

<<<<<<< HEAD
import {Layout, Menu, Icon, Table } from 'antd';
import { chooseCurrentRoles, newColumns, newColumnsUser } from '../../functions';
import {withRouter} from "react-router-dom";
=======
import {Layout, Menu, Icon, Table } from 'antd'; 
import { chooseCurrentRoles, newColumns, newColumnsUser } from '../../functions';
>>>>>>> cb92cefca0c854692de1dcc6f485ca74fabc1a50

const { Sider, Content } = Layout;

const SideBar = (props) =>  {
<<<<<<< HEAD
    const { participant: {participants}, user:{user}, deleteOrRestore,deleteUser, history } = props;
=======
    const { participant: {participants}, user:{user} } = props;   
   
    const [state, setState] = useState({ collapsed: true, show: '' });
>>>>>>> cb92cefca0c854692de1dcc6f485ca74fabc1a50

    const columns =state.show ==="Participants" ? newColumns : newColumnsUser(state.show);

<<<<<<< HEAD
    const [state, setState] = useState({ collapsed: true, show: '' });

    const isParticipant = state.show ==="Participants";
    const isUser = state.show ==="Users";
    const isBin = state.show ==="Bin";

    const columns = isParticipant ? newColumns : newColumnsUser(state.show, deleteOrRestore, deleteUser, history);

        const newData = isParticipant ?  chooseCurrentRoles(participants, "Participants") :
         isUser ? chooseCurrentRoles(user, "Users") : isBin ? chooseCurrentRoles(user, "Bin") : [];
=======
        const newData = state.show ==="Participants" ?  chooseCurrentRoles(participants, "Participants") :
         state.show ==="Users" ? chooseCurrentRoles(user, "Users") : [];
      
     
>>>>>>> cb92cefca0c854692de1dcc6f485ca74fabc1a50

    const toggle = (e) => {
        if(e.target.className !== "ant-layout-sider-children" ) return null;
        setState({...state, collapsed: !state.collapsed });
<<<<<<< HEAD
    };
=======
    }; 
>>>>>>> cb92cefca0c854692de1dcc6f485ca74fabc1a50
        return (
            <Layout className="side-bar__wrapper" >
                <Sider collapsible onClick={toggle} collapsed={state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" >
                        <Menu.Item key="1" onClick={()=>setState({...state, show: "Users"})}>
                            <Icon type="user" />
                            <span>Users</span>
                        </Menu.Item>
                        <Menu.Item key="2" onClick={()=>setState({...state, show: "Participants"})}>
                            <Icon type="qq" />
                            <span>Participants</span>
                        </Menu.Item>
                        <Menu.Item key="3" onClick={()=>setState({...state, show: "Bin"})}>
                            <Icon type="rest" />
                            <span>Bin</span>
                        </Menu.Item>
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

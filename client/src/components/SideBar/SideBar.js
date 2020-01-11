import React, {useState} from 'react';
import "./SiderDemo.css";

import {Layout, Menu, Icon, Card } from 'antd';

const { Sider, Content } = Layout;

const SideBar = (props) =>  {
    const { participant: {participants}, user } = props;
    console.log(participants);
    const [state, setState] = useState({ collapsed: true });


    const toggle = (e) => {
               if(e.target.className !== "ant-layout-sider-children" ) return null;
        setState({ collapsed: !state.collapsed });

    };
    // const onClose=(e)=>{
    //     if(e.target.className !== "ant-layout-sider-children" ) setState({ collapsed: true });
    // };


        return (
            <Layout className="side-bar__wrapper" >
                <Sider trigger={null} collapsible onClick={toggle} collapsed={state.collapsed}>
                    <div className="logo" />
                    <Menu theme="dark" mode="inline"  >
                        <Menu.Item key="1" >
                            <Icon type="user" />
                            <span>Users</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="qq" />
                            <span>Participants</span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="rest" />
                            <span>Bin</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>

                    <Content    className="content__wrapper">

                {
                    participants.length > 0 && participants.map(el=> ( <div className="card__mapping" key={el._id}>
                            <Card title={`${el.Username} ${el.Lastname}`} bordered={false} style={{ width: 300 }}>
                                <p>{el.Company}</p>
                                <p>{el.Position}</p>
                                <p>{el.Country}</p>
                                <p>{el.Email}</p>
                                <p>{el.createdAt}</p>
                                <p>{el.Status ? el.Status: "New"}</p>
                            </Card>
                        </div>)
                    )


                 }



                    </Content>
                </Layout>
            </Layout>
        );
};


export default  SideBar

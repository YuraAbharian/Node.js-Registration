import React, {useState, useEffect} from 'react';
import "./SideStyle.css";
import {Layout, Menu, Icon, Table, Input, Button} from 'antd';
import {chooseCurrentRoles, newColumns, newColumnsUser} from '../../functions';
import {withRouter} from "react-router-dom";
import Highlighter from 'react-highlight-words';

const {Sider, Content} = Layout;

const SideBar = (props) => {
    const {participant: {participants}, admin: {selectedArea, isSuperAdmin}, user: {user}, deleteOrRestore, deleteUser, history} = props;


    const [state, setState] = useState({
        collapsed: true,
        show: '',
        filteredInfo: null,
        sortedInfo: null,
        data: [],
        loading: false,

    });
    useEffect(() => {
        switch (selectedArea) {
            case 1: {
                setState({...state, show: "Users"});
                return
            }
            case 2: {
                setState({...state, show: "Participants"});
                return
            }
            default : {
                return
            }
        }

    }, [selectedArea]);

    const {sortedInfo} = state;
    const sortedInfos = sortedInfo || {};

    const handleChange = (pagination, filters, sorter) => {
        setState({
            ...state,
            filteredInfo: filters,
            sortedInfo: sorter,
            searchText: '',
            searchedColumn: '',
        });
    };


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setState({
            ...state,
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    const handleReset = clearFilters => {
        clearFilters();
        setState({...state, searchText: ''});
    };


    let searchInput;

    const getColumnSearchProps = dataIndex => ({
        filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
            <div style={{padding: 8}}>
                <Input
                    ref={node => {
                        searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Button
                    type="primary"
                    onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{width: 90, marginRight: 8}}
                >
                    Search
                </Button>
                <Button onClick={() => handleReset(clearFilters)} size="small" style={{width: 90}}>
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => (
            <Icon type="search" style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
            if (visible) {
                setTimeout(() => searchInput.select());
            }
        },
        render: text =>
            state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
                    searchWords={[state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    const isParticipant = state.show === "Participants";
    const isUser = state.show === "Users";
    const isBin = state.show === "Bin";
    const isSuperAdminTrue = isSuperAdmin;

    const columns = isParticipant ? newColumns(sortedInfos, getColumnSearchProps) : newColumnsUser(state.show, deleteOrRestore, deleteUser, history);

    const newData = isParticipant  ? chooseCurrentRoles(participants, "Participants") :
        isUser  ? chooseCurrentRoles(user, "Users") : isBin ? chooseCurrentRoles(user, "Bin") : [];

    const toggle = (e) => {
        if (e.target.className !== "ant-layout-sider-children") return null;
        setState({...state, collapsed: !state.collapsed});
    };


    return (
        <Layout className="side-bar__wrapper">
            <Sider collapsible onClick={toggle} collapsed={state.collapsed}>
                <div className="logo"/>
                <Menu defaultSelectedKeys={[`${selectedArea}`]} theme="dark" mode="inline">
                    {isSuperAdminTrue ? <Menu.Item key="1" onClick={() => setState({...state, show: "Users"})}>
                        <Icon type="user"/>
                        <span>Users</span>
                    </Menu.Item> : null}
                    <Menu.Item key="2" onClick={() => setState({...state, show: "Participants"})}>
                        <Icon type="qq"/>
                        <span>Participants</span>
                    </Menu.Item>
                    {isSuperAdminTrue ? <Menu.Item key="3" onClick={() => setState({...state, show: "Bin"})}>
                        <Icon type="rest"/>
                        <span>Bin</span>
                    </Menu.Item> : null}
                </Menu>
            </Sider>
            <Layout>

                <Content className="content__wrapper">

                    {state.show && <Table
                        onChange={handleChange}
                        onRow={(record) => {
                            return isParticipant && {
                                onClick: event => history.push(`/menu/applyParticipant/${record.key}`), // click row

                            };
                        }}


                        columns={columns} dataSource={newData}/>}

                </Content>
            </Layout>
        </Layout>
    );
};


export default withRouter(SideBar)

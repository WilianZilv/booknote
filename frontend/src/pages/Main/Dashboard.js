import React, { useState, useEffect } from 'react'

import 'antd/dist/antd.css'

import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import AccountCircle from '@material-ui/icons/AccountCircle';

import { Layout, Typography, Button, Card, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import api from '../../services/api'

import './main.css'
const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;



const Dashboard = ({ history }) => {

    const token = localStorage.getItem("token_auth");


    const user = JSON.parse(token);
    console.log(user)

    const [update, setUpdate] = useState(true);
    const [Profile, SetProfile] = useState({});

    if (!token) {
        history.push('/Login')
    }

    const fetchProfile = async () => {
        const response = await api.get(`/user/profile/${user.username}`).then((e) => {
            console.log("kkk")
            console.log(e.data);
            SetProfile(e.data);
        })
    }

    useEffect(() => {
        if (update) {
            fetchProfile()
            setUpdate(false);
        }
    }, [update])



    return (
        <Layout>
            <Header style={{ backgroundColor: 'white' }}>
                <nav className="header">
                    <Title level={3} style={{ marginTop: '10px' }}>BookNote</Title>
                    <TextField id="searchBar" placeholder="Pesquise um Resumo" style={{ marginLeft: '50px', marginRight: '50px' }} />
                    <Button type="primary" onClick={() => {
                        localStorage.removeItem("token_auth");
                        history.push('/')
                    }}>Sair</Button>
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="primary-search-account-menu"
                        aria-haspopup="true"
                        color="inherit"
                        style={{
                            marginLeft: '30px',
                        }}
                    >
                        <AccountCircle onClick={() => {
                            history.push('/profile/' + user.username);
                        }} />
                    </IconButton>
                    <Button id="btnPublish" style={{ marginLeft: '20px' }} type="primary" onClick={() => {
                        history.push('/publish')
                    }}>
                        PUBLICAR RESUMO
                    </Button>

                </nav>
            </Header>
            <Content className="content">
                <Menu
                    style={{ width: 256, marginTop: '50px' }}
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    mode="inline"
                >

                    <SubMenu
                        key="sub1"
                        title={
                            <span>
                                <span>Matérias</span>
                            </span>
                        }
                    >
                        <Menu.ItemGroup key="g1" title="Exatas">
                            <Menu.Item key="1">Matemática</Menu.Item>
                            <Menu.Item key="2">Fisíca</Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup key="g2" title="Humanas">
                            <Menu.Item key="3">Option 3</Menu.Item>
                            <Menu.Item key="4">Option 4</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>

                </Menu>
                <Card title={user.username} id="userCard" style={{ height: '150px', width: '300px', marginTop: '50px', }}>
                    <img src="" />
                    <p>{Profile.followers} seguidores</p>
                </Card>
            </Content>
        </Layout>
    )
}

export default Dashboard;
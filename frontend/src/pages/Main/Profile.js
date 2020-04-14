import React, { useState, useEffect } from 'react'

import 'antd/dist/antd.css'
import parse from 'html-react-parser';
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import AccountCircle from '@material-ui/icons/AccountCircle';
import api from '../../services/api'
import { Layout, Typography, Button, Card, Menu, notification } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import './main.css'
const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;



const Profile = ({ history, match }) => {
    console.log(match)
    const token = localStorage.getItem("token_auth");

    const [update, setUpdate] = useState(true);
    const [Posts, setPosts] = useState([]);

    if (!token) {
        history.push('/login')
    }

    const fetchPosts = () => {
        const response = api.get(`/user/publish/${match.params.username}`).then((e) => {
            console.log(e.data);
            setPosts(e.data);
        }).catch(() => {
            notification.error({
                message: "Erro ao encontrar usuario."
            })
            history.push('/')
        });
    }

    const handleDelete = async (id) => {
        await api.delete(`/user/publish/${id}`,{headers: {auth: user.token}}).then( async (e) => {
            console.log(e.data);
            await fetchPosts();
            notification.success({
                message:"Post Deletado com Sucesso!"
            })
        }).catch(() => {
            notification.error({
                message: "Erro ao deletar post."
            })
            history.push('/')
        });
    }

    useEffect(() => {
        if (update) {
            fetchPosts()
            setUpdate(false);
        }
    }, [update])



    const user = JSON.parse(token);
    console.log(user)

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
                        history.push('/')
                    }}>
                        Dashboard
                    </Button>

                </nav>
            </Header>
            <Content style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Card title={user.username} id="userCard" style={{ height: '150px', width: '600px', marginTop: '50px', }}>
                    <img src="" />
                    <p>0 seguidores</p>
                </Card>
                {Posts.map((post) => {
                    return(
                        <>
                        <Card title={post.subject} id="userCard" style={{ height: '150px', width: '400px', marginTop: '50px' }}>
                        {parse(`${post.content}`)}
                        </Card>
                    <nav id="menu" style={{display:'flex',flexDirection:'row-reverse',marginTop:'10px'}}>
                    {(user.username == match.params.username && (
                        <Button danger type="primary" style={{marginLeft:'200px'}} onClick={() => {
                            handleDelete(post.id)
                        }} >Excluir</Button>
                    ))}
                    <p>{post.likes} Curtidas</p>
                    </nav>
                    
                    </>
                    )
                })}
            </Content>
        </Layout>
    )
}

export default Profile;
import React, { useState } from 'react'

import 'antd/dist/antd.css'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import AccountCircle from '@material-ui/icons/AccountCircle';



import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { Layout, Typography, Button, Card, Menu, notification } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

import api from '../../services/api'

import './main.css'
const { SubMenu } = Menu;
const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;



const Publish = ({ history }) => {

    const token = localStorage.getItem("token_auth");

    

    if (!token) {
        history.push('/Login')
    }


    const user = JSON.parse(token);
    const [content, setContent] = useState('');


    const handlePublish = async () => {
        console.log(content)
        const response = await api.post('/user/publish', {
            content,
            subject: 'Matemática'
        }, {
            headers: {
                auth: user.token
            }
        }).then((e) => {
            notification.success({ message: "Publicado com Sucesso!" });
            history.push('/')
        }).catch(() => {
            notification.error({ message: "Erro ao tentar publicar!" })
            history.push('/')
        })
        console.log(response)
    }

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
                        DASHBOARD
                    </Button>

                </nav>
            </Header>
            <Content style={{
                display: 'flex',
                height:'80vh',
                justifyContent:'center'
            }}>

                <Editor
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    style={{
                        height:'50px'
                    }}
                    onChange={(e) => {
                        console.log(e)
                        var conteudo = '';
                        e.blocks.map((content) => {

                            conteudo = conteudo + `<p>${content.text}</p><br>`

                        })
                        setContent(conteudo);

                    }}
                />

                <Card title="Opa finalizou?" id="userCard" style={{ height: '150px', width: '300px', marginTop: '10px',marginRight:'20px',transition:'all 0.5s' }}>
                    <Button id="btnPublish" style={{ marginLeft: '70px' }} type="primary" onClick={() => {
                        handlePublish();
                    }}>
                        PUBLICAR
                    </Button>
                </Card>
            </Content>
        </Layout>
    )
}

export default Publish;
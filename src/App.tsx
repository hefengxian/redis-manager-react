import React, { useState } from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import {
  QuestionCircleOutlined,
  SettingOutlined,
  PlusOutlined,
  HomeOutlined,
  CodeOutlined,
  SyncOutlined,
  EllipsisOutlined,
  DatabaseOutlined,
  CloudServerOutlined,
  DashboardOutlined,
  ProjectOutlined,
} from '@ant-design/icons';
import {
  Button,
  Input,
  Tabs,
  Avatar,
  Card,
  Modal,
  Form,
  Checkbox,
  InputNumber,
  message,
} from 'antd';
import './App.less';
import logo from '../assets/logo.svg';
import store from './storage';
import Redis from 'ioredis';

function Main() {
  const list = [
    {
      key: 'xxx',
      title: `192.168.0.xxx:6379`,
      desc: 'this is a description of 192.168.0.xxx:6379',
      active: true,
    },
  ];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i <= 2; i++) {
    list.push({
      key: String(100 + i),
      title: `192.168.0.${100 + i}:6379`,
      desc: `this is a description of 192.168.0.${100 + i}:6379`,
      active: false,
    });
  }

  const storedConnections = store.getConnections();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [connections, setConnections] = useState(storedConnections);
  const [tabs, setTabs] = useState([]);
  const [form] = Form.useForm();

  const defaultForm = {
    host: '192.168.0.211',
    port: 6379,
    password: '',
    separator: ':',
    name: 'Redis 211',
  };

  function handleOk() {
    // 获取到表单信息
    const connection = form.getFieldsValue();
    // 预处理
    if (connection.host.trim().length === 0) {
      connection.host = '127.0.0.1';
    }
    if (connection.separator.trim().length === 0) {
      connection.separator = ':';
    }
    const key = `${connection.host}:${connection.port}`;
    if (connection.name.trim().length === 0) {
      connection.name = key;
    }
    connection.key = key;

    let isExist = false;
    storedConnections.forEach((v) => {
      if (v.key === key) {
        isExist = true;
      }
    });

    if (!isExist) {
      // 连接信息
      storedConnections.push(connection);
      // 加入本地永久存储
      store.storeConnections(storedConnections);
      // 获取 Redis 连接
      const client = new Redis(connection);
      connection.client = client;
      connections.push(connection);
      setConnections(connections);

      // 向 tab list 加一个 tab（用对象？），检查是否存在
      tabs.push({ key, title: `${connection.name} - Dashboard`, client });
      setTabs(tabs)
    } else {
      message.warn('you already add this one');
      return;
    }

    // 并且打开那个 Tab
    //
    // you
    setIsModalVisible(false);
  }

  function handleCancel() {
    setIsModalVisible(false);
  }

  function handleConnectionClick(e, conn) {
    // console.log(conn)
    if (!conn.client) {
      conn.client = new Redis(conn)
    }
    const key = `${conn.host}:${conn.port}`

    let tabExists = false;
    tabs.forEach(t => {
      if (t.key === key) {
        tabExists = true
      }
    });
    if (!tabExists) {
      tabs.push({
        key,
        client: conn.client,
        title: `${conn.name} - Dashboard`,
      })
      setTabs([...tabs]);
    }
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  };
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  };

  return (
    <>
      <div className="content">
        <div className="list">
          <div className="search-box">
            <Input.Search size="small" className="search" />
            <Button
              onClick={() => setIsModalVisible(true)}
              size="small"
              icon={<PlusOutlined />}
            />
          </div>
          <div className="actions">
            <div className="actions-left" />
            <div className="actions-right">
              <Button type="text" size="small" icon={<HomeOutlined />} />
              <Button type="text" size="small" icon={<CodeOutlined />} />
              <Button type="text" size="small" icon={<SyncOutlined />} />
              <Button type="text" size="small" icon={<EllipsisOutlined />} />
            </div>
          </div>
          <ul className="items">
            {connections.map((conn) => (
              <li
                onClick={(e) => {
                  handleConnectionClick(e, conn);
                }}
                className="item"
                key={conn.key}
              >
                <div className="title-box">
                  <div className="title">{conn.name}</div>
                </div>
                <div className="desc">{conn.name}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className="detail">
          <Tabs
            size="small"
            hideAdd
            className="tabs"
            type="editable-card"
            defaultActiveKey="1"
          >
            {tabs.map((tab) => (
              <Tabs.TabPane
                tab={tab.title}
                key={tab.key}
              >
                <div className="home-actions">
                  <Button size="small" icon={<SyncOutlined />}>
                    Refresh
                  </Button>
                </div>

                <div className="board">
                  <Card
                    className="board-item"
                    size="small"
                    title={
                      <div className="card-title">
                        <DashboardOutlined className="icon" />
                        <span>Stats</span>
                      </div>
                    }
                  >
                    <p>Connected Clients: 1</p>
                    <p>Total Connections: 1</p>
                    <p>Total Commands: 3</p>
                  </Card>
                  <Card
                    className="board-item"
                    size="small"
                    title={
                      <div className="card-title">
                        <ProjectOutlined className="icon" />
                        <span>Memory</span>
                      </div>
                    }
                  >
                    <p>Used Memory: 839.17K</p>
                    <p>Used Memory Peak: 839.17K</p>
                    <p>Used Memory Lua: 41K</p>
                  </Card>
                  <Card
                    className="board-item"
                    size="small"
                    title={
                      <div className="card-title">
                        <CloudServerOutlined className="icon" />
                        <span>Server</span>
                      </div>
                    }
                  >
                    <p>Redis Version: 5.0.3</p>
                    <p>OS: Linux4.19.0-14-amd64x86_64</p>
                    <p>Process ID: 423</p>
                  </Card>
                </div>
              </Tabs.TabPane>
            ))}
          </Tabs>
        </div>
      </div>

      <Modal
        title="New Connection"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          form={form}
          name="basic"
          initialValues={defaultForm}
        >
          <Form.Item
            label="Host"
            name="host"
          >
            <Input
              placeholder="127.0.0.1"
            />
          </Form.Item>
          <Form.Item label="Port" name="port">
            <InputNumber placeholder="6379" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item label="Separator" name="separator">
            <Input placeholder=":" />
          </Form.Item>
          <Form.Item label="Name" name="name">
            <Input placeholder="" />
          </Form.Item>
          <Form.Item { ...tailLayout }>
            <Checkbox>SSH Tunnel</Checkbox>
            <Checkbox>SSH</Checkbox>
            <Checkbox>Cluster</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

function Setting() {
  return (
    <div
      style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      Settings
    </div>
  );
}

export default function App() {
  const routers = [
    {
      path: '/main',
      page: <Main />,
    },
    {
      path: '/setting',
      page: <Setting />,
    },
    {
      path: '/',
      exact: true,
      page: <Main />,
    },
  ];

  return (
    <>
      <div className="nav">
        <ul className="nav-top">
          <li className="logo">
            <Avatar shape="square" src={logo} />
          </li>
          <li>
            <NavLink to="/main">
              <DatabaseOutlined />
            </NavLink>
          </li>
          <li>
            <NavLink to="/help">
              <QuestionCircleOutlined />
            </NavLink>
          </li>
        </ul>
        <ul className="nav-bottom">
          <li>
            <NavLink to="/setting">
              <SettingOutlined />
            </NavLink>
          </li>
        </ul>
      </div>

      <Switch>
        {routers.map((r) => (
          <Route key={r.path} exact={r.exact} path={r.path}>
            {r.page}
          </Route>
        ))}
      </Switch>
    </>
  );
}

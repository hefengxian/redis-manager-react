import React from 'react';
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
import { Button, Input, Tabs, Avatar, Card } from 'antd';
import './App.less';
import logo from '../assets/logo.svg';

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

  return (
    <div className="content">
      <div className="list">
        <div className="search-box">
          <Input.Search size="small" className="search" />
          <Button size="small" icon={<PlusOutlined />} />
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
          {list.map((item) => (
            <li className="item" key={item.key}>
              <div className="title-box">
                <div className="title">{item.title}</div>
              </div>
              <div className="desc">{item.desc}</div>
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
          {[...Array.from({ length: 20 }, (_v, i) => i)].map((i) => (
            <Tabs.TabPane
              tab={`Long title tab-${i}`}
              key={i}
              disabled={i === 28}
            >
              <div className="home-actions">
                <Button
                  size="small"
                  icon={<SyncOutlined />}>Refresh</Button>
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

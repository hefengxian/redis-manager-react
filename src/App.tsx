import React, { useState } from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
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
  ApiOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  WindowsOutlined,
  AppleOutlined,
  CopyOutlined,
  CaretDownOutlined,
  CaretRightOutlined,
  KeyOutlined,
} from '@ant-design/icons'
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
  Menu,
  Dropdown,
  Badge,
  Tree,
  Select,
} from 'antd'
import './App.less'
import store from './storage'
import { get, save, connect } from './ConnectionManager'
import NavPanel from './NavPanel'


function Main() {

  const storedConnections = store.getConnections()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [connections, setConnections] = useState(storedConnections)
  const [tabs, setTabs] = useState([])
  const [form] = Form.useForm()

  const testKeys = [
    {
      title: 'parent 1-0',
      key: '0-0-0',
      children: [
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [
            { icon: <KeyOutlined />, title: 'sss', key: '0-0-1-0', isLeaf: true },
            { icon: <KeyOutlined />, title: 'sss1', key: '0-0d-1-0', isLeaf: true },
          ],
        },
        {
          title: 'parent 1-2',
          key: '0-0-2',
          children: [{ title: 'sss', key: '0-0-1-0d', isLeaf: true }],
        },
        {
          title: 'leaf',
          key: '0-0-0-0',
          isLeaf: true,
        },
        {
          title: 'leaf',
          key: '0-0-0-1',
          isLeaf: true,
        },
      ],
    },

  ]

  const defaultForm = {
    host: '192.168.0.211',
    port: 6379,
    password: '',
    separator: ':',
    name: 'Redis 211',
    open: false,
    keys: [],
  }

  function handleOk() {
    // 获取到表单信息
    const connection = { ...defaultForm, ...form.getFieldsValue() }

    // 预处理
    if (connection.host.trim().length === 0) {
      connection.host = '127.0.0.1'
    }
    if (connection.separator.trim().length === 0) {
      connection.separator = ':'
    }
    const key = `${connection.host}:${connection.port}-${Math.random() * 1000}`
    if (connection.name.trim().length === 0) {
      connection.name = key
    }
    connection.key = key

    let isExist = false
    storedConnections.forEach((v) => {
      if (v.key === key) {
        isExist = true
      }
    })

    if (!isExist) {
      // 连接信息
      storedConnections.push(connection)
      // 加入本地永久存储
      store.storeConnections(storedConnections)
      // 获取 Redis 连接
      const client = connect(connection)
      save(key, client)
      // connection.client = client;
      connections.push(connection)
      setConnections(connections)

      // 向 tab list 加一个 tab（用对象？），检查是否存在
      tabs.push({ key, title: `${connection.name} - Dashboard`, client })
      setTabs(tabs)
    } else {
      message.warn('you already add this one')
      return
    }

    // 并且打开那个 Tab
    //
    // you
    setIsModalVisible(false)
  }

  function handleCancel() {
    setIsModalVisible(false)
  }

  function handleConnectionClick(e, conn) {
    // console.log(conn)
    if (!conn.client) {
      // conn.client = new Redis(conn);
    }
    const key = `${conn.host}:${conn.port}`
    setSelected(conn)

    let tabExists = false
    tabs.forEach(t => {
      if (t.key === key) {
        tabExists = true
      }
    })
    if (!tabExists) {
      tabs.push({
        key,
        client: conn.client,
        title: `${conn.name} - Dashboard`,
      })
      setTabs([...tabs])
    }
  }

  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
  }
  const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
  }

  const menuItems = [
    {
      key: 'close',
      icon: <ApiOutlined />,
      text: 'Close connection',
      onClick: () => {
        message.warning('TODO Close connection')
      },
    },
    {
      key: 'edit',
      icon: <EditOutlined />,
      text: 'Edit connection',
      onClick: () => {
        message.warning('TODO Edit connection')
      },
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      text: 'Delete connection',
      onClick: () => {
        Modal.confirm({
          autoFocusButton: 'cancel',
          content: 'Confirm to delete this connection?',
          onOk: () => {
            let conn = connections.filter((conn: null) => conn != selected)
            setConnections(conn)
            store.storeConnections(conn)
            setSelected(null)
          },
        })
      },
    },
    {
      key: 'flush',
      icon: <SaveOutlined />,
      text: 'Flush DB',
      onClick: () => {
        message.warning('TODO Flush DB')
      },
    },
  ]

  const menu = (
    <Menu>
      {menuItems.map(item => (
        <Menu.Item
          key={item.key}
          icon={item.icon}
          onClick={item.onClick}
        >{item.text}</Menu.Item>
      ))}
    </Menu>
  )

  const goRedisHome = () => {
    alert('TODO goRedisHome')
  }
  const goRedisTerminal = () => {
    alert('TODO goRedisTerminal')
  }
  const refreshConnection = () => {
    alert('TODO refreshConnection')
  }
  const duplicateConnection = () => {
    alert('TODO duplicateConnection')
  }
  const onFilter = () => {
    message.warning('TODO onFilter')
  }


  return (
    <>
      <div className="content">
        <div className="list">
          <div className="search-box">
            <Input.Search
              allowClear
              onSearch={onFilter}
              size="small"
              className="search" />
            <Button
              onClick={() => setIsModalVisible(true)}
              size="small"
              icon={<PlusOutlined />}
            />
          </div>
          <div className="actions">
            <div className="actions-left">

            </div>
            <div className="actions-right">
              <Button
                disabled={!selected}
                onClick={goRedisHome}
                type="text"
                size="small"
                icon={<HomeOutlined />} />
              <Button
                onClick={duplicateConnection}
                title="Duplicate"
                type="text"
                size="small"
                icon={<CopyOutlined />} />
              <Button
                disabled={!selected}
                onClick={goRedisTerminal}
                type="text"
                size="small"
                icon={<CodeOutlined />} />
              <Button
                disabled={!selected}
                onClick={refreshConnection}
                type="text"
                size="small"
                icon={<SyncOutlined />} />
              <Dropdown
                trigger={['click']}
                overlay={menu}
                disabled={!selected}>
                <Button type="text" size="small" icon={<EllipsisOutlined />} />
              </Dropdown>
              {/*<Button disabled={!selected} type="text" size="small" icon={<EllipsisOutlined />} />*/}
            </div>
          </div>
          <ul className="items">
            {connections.map((conn) => (
              <>
                {/*<div>
                  <Tree style={{ backgroundColor: 'transparent' }} blockNode treeData={conn.keys} />
                </div>*/}
                <li
                  onDoubleClick={(e) => {
                    handleConnectionClick(e, conn)
                  }}
                  onClick={() => {
                    setSelected(conn)
                  }}
                  className={(selected === conn) ? 'item active' : 'item'}
                  key={conn.key}
                >
                  <div className="title-box">
                    <div className="switcher" onClick={() => {
                      setConnections(connections.map(c => {
                        if (c == conn) {
                          c.open = !c.open
                        }
                        return c
                      }))
                    }}>
                      {conn.open ? <CaretDownOutlined /> : <CaretRightOutlined />}
                    </div>

                    {/*<Avatar icon={<WindowsOutlined />} />*/}
                    <div className="title">{conn.name}</div>
                    {/*<WindowsOutlined />*/}
                    {/*<Badge color="grey" />*/}
                    {/*<AppleOutlined />*/}
                  </div>
                </li>
                <div className="key-tree">
                  {!conn.open ? null :
                    <>
                      <div className="key-tools">
                        <div className="key-tools-left">
                          <Select
                            size="small"
                            suffixIcon={<CaretDownOutlined />}
                            style={{ width: 'fit-content', fontSize: '10px' }}
                            bordered={false}
                            defaultValue="0">
                            <Select.Option value="0">DB0</Select.Option>
                            <Select.Option value="1">DB100</Select.Option>
                            <Select.Option value="2">DB2</Select.Option>
                          </Select>
                          <Button
                            onClick={() => setIsModalVisible(true)}
                            size="small"
                            type="text"
                            icon={<PlusOutlined />}
                          />
                        </div>
                        <div className="key-tools-right">
                          <Input.Search
                            allowClear
                            onSearch={onFilter}
                            size="small"
                            className="search" />

                        </div>
                      </div>
                      <Tree.DirectoryTree
                        showIcon
                        blockNode
                        treeData={testKeys}
                      />
                    </>
                  }
                </div>
              </>
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
          <Form.Item {...tailLayout}>
            <Checkbox>SSH Tunnel</Checkbox>
            <Checkbox>SSH</Checkbox>
            <Checkbox>Cluster</Checkbox>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
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
  )
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
  ]

  return (
    <>
      <NavPanel />
      <Switch>
        {routers.map((r) => (
          <Route key={r.path} exact={r.exact} path={r.path}>
            {r.page}
          </Route>
        ))}
      </Switch>
    </>
  )
}

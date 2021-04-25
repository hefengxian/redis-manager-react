import React from 'react'
import { Avatar } from 'antd'
import logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'
import { DatabaseOutlined, QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons'

export default () => {
  return (
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
  )
}

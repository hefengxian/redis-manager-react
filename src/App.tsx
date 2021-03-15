import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {
  LinkOutlined,
  StarOutlined,
  SettingOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Input,
} from 'antd';
import icon from '../assets/icon.svg';
import './App.less';

const Hello = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon}/>
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              🙏
            </span>
            Donate
          </button>
        </a>
      </div>
    </div>
  );
};

function Main() {
  return (
    <div className="main">
      <div className="nav">
        <ul className="nav-top">
          <li>
            <Link to="/">
              <LinkOutlined />
            </Link>
          </li>
          <li>
            <Link to="/">
              <StarOutlined />
            </Link>
          </li>
        </ul>
        <ul className="nav-bottom">
          <li>
            <Link to="/">
              <SettingOutlined />
            </Link>
          </li>
        </ul>
      </div>

      <div className="content">
        <div className="links">
          <div className="toolbar">
            <Input.Search size="small" style={{ width: 'auto' }} />
            <Button type="primary" size="small" icon={<PlusOutlined />} />
          </div>
          <div className="link-list">todo list</div>
        </div>
        <div className="detail"></div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Main}/>
        <Route path="/hello" component={Hello}/>
      </Switch>
    </Router>
  );
}

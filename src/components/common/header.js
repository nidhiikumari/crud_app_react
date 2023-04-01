import React from 'react';
import {
  Layout,
  Menu,
  Button,
} from 'antd';
import css from './css';

const { Header } = Layout;

const Appbar = () => {
  return (
    <div>
      <Layout>
        <Header style={css.headerStyle}>
          <Menu
            theme="dark"
            mode="horizontal"
            style={css.menuStyles}
          >
          </Menu>
        </Header>
      </Layout>
    </div>
  )
};

export default Appbar;
import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './index.module.scss';
import { Menu } from 'antd';

import HomePage from '../../views/HomePage';

export const config = [{
  path: '/',
  component: HomePage,
  name: '首页',
},{
  path: '/aaa',
  component: HomePage,
  name: '首页1',
},{
  path: '/aaaa',
  component: HomePage,
  name: '首页2',
},{
  path: '/aaaaaa',
  component: HomePage,
  name: '首页3',
}]

const App: React.FC = (props: any) => {

  function hitstoryChange (item: any) {
    props.history.push(item.path)
    console.log(window.location);
  }
  return (
    <div className={styles.container}>
      <Menu onClick={hitstoryChange} mode="horizontal">{
        config.map((v:any, i: number) => {
        return <Menu.Item key={i}>{v.name}</Menu.Item>
        })
      }</Menu>
    </div>
  );
}

export default withRouter(App);

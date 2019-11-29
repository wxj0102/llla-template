import React from 'react';
import { withRouter } from 'react-router-dom';
import styles from './index.module.scss';
import { Menu } from 'antd';

import HomePage from '../../views/HomePage';
import Work from '../../views/Work';

export const config = [{
  path: '/',
  exact: true,
  component: HomePage,
  name: '首页',
},{
  path: '/work',
  component: Work,
  name: '任务管理',
}]

const App: React.FC = (props: any) => {

  function hitstoryChange (item: any) {
    props.history.push(item.key)
  }
  const pathName = props.location.pathname;
  return (
    <div className={styles.container}>
      <Menu onSelect={hitstoryChange} selectedKeys={[pathName]} mode="horizontal">{
        config.map((v:any, i: number) => {
        return <Menu.Item key={v.path}>{v.name}</Menu.Item>
        })
      }</Menu>
    </div>
  );
}

export default withRouter(App);

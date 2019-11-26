import React from 'react';
import { Button } from 'antd';
import styles from './index.module.scss';

const App: React.FC = () => {
  return (
    <div className={styles.container}>
      <Button>我是首页啊</Button>
    </div>
  );
}

export default App;

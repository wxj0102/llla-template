import React, { useState, useEffect } from 'react';
import { ipcRenderer } from '../../electron';
// import { ipcRenderer } from 'electron';
import { Button } from 'antd';
import styles from './index.module.scss';

const App: React.FC = () => {
  // 列表数据
  const [data, setData] = useState([]);

  // 更新标识
  const [step, setStep] = useState(0);

  useEffect(() => {
    // 这里去获取数据
    ipcRenderer.invoke('work').then((res: object) => {

      console.log(res);
    }).catch((error: any) => {
      console.log(error);
    })
  }, [step]);

  return (
    <div className={styles.container}>
      <Button>任务管理</Button>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import { Select, Button, message } from 'antd';
import styles from './index.module.scss';

const App: React.FC = () => {
  const [functionValue, setFunctionValue] = useState(null);
  const [loading, setLoading] = useState(false);

  const changeFunction = function (value: any) {
    setFunctionValue(value);
  }
  const run = function () {
    console.log(functionValue);
    message.info('操作进行中, 请耐心等待');
    setLoading(true);
  }
  return (
    <div className={styles.container}>
      <div>请选择要执行的命令</div>
      <div>
        <Select disabled={loading} onChange={changeFunction} className={styles.select}>
          <Select.Option value="打包1">打包1</Select.Option>
          <Select.Option value="打包2">打包2</Select.Option>
          <Select.Option value="打包3">打包3</Select.Option>
          <Select.Option value="打包4">打包4</Select.Option>
        </Select>
      </div>
      <div>
        <Button onClick={run} loading={loading}>运行</Button>
      </div>
    </div>
  );
}

export default App;

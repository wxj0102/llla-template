import React from 'react';
import './common.scss';
import HomePage from './views/HomePage';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <HomePage></HomePage>
    </div>
  );
}

export default App;

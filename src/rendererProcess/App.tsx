import React from 'react';
import './common.scss';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from './views/HomePage';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Router>
        <Switch>
          <Route path="/" component={HomePage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

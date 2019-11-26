import React from 'react';
import './common.scss';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header, { config } from './components/Header';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Router>
        <Header></Header>
        <Switch>{
          config.map((v, index: number) => {
            return <Route key={index} path={v.path} component={v.component}></Route>
          })
        }
        </Switch>
      </Router>
    </div>
  );
}

export default App;

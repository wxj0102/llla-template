import React from 'react';
import './common.scss';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Header, { config } from './components/Header';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Header></Header>
        <Switch>{
          config.map((v, index: number) => {
            return <Route key={v.path} exact={v.exact || false} path={v.path}>
              <v.component></v.component>
            </Route>
          })
        }</Switch>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import 'antd/dist/antd.css';

import BarChart from "./components/BarChart";
import Header from "./common/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Switch>
          <Route path="/bar-chart" component={BarChart}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;

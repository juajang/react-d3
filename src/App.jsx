import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import 'antd/dist/antd.css';
import "./index.css";

// data
import { lineData } from "./data/LineData";

// components
import Basic from "./pages/Basic";
import Header from "./components/common/Header";
import LineChart from "./pages/LineChartJs";
import Basics from './pages/Basics';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <main>
          <Switch>
            <Route path="/basic">
              <Basic/>
            </Route>
            <Route path="/line-chart">
              <LineChart height={400} values={lineData}/>
            </Route>
            <Route path="/basics">
              <Basics/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

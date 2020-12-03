import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import 'antd/dist/antd.css';
import "./index.css";

// data
import { lineData } from "./data/LineData";

// components
import Basic from "./pages/Basic";
import Header from "./components/common/Header";
import LineChart from "./pages/LineChartJs";
import Basics from './pages/tutorials/Basics';
import CurvedLineChart from './pages/tutorials/CurvedLineChart';
import ReactWithD3Basic from './pages/ReactWithD3Basic';

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
            <Route path="/curved-line-chart">
              <CurvedLineChart/>
            </Route>
            <Route path="/react-with-d3">
              <ReactWithD3Basic/>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import 'antd/dist/antd.css';
import "./index.css";

// data
import { lineData } from "./data/lineData";

// components
import Basic from "./pages/Basic";
import Header from "./components/common/Header";
import LineChart from "./pages/LineChartJs";
import Basics from './pages/tutorials/Basics';
import CurvedLineChart from './pages/tutorials/CurvedLineChart';
import ReactWithD3Basic from './pages/ReactWithD3Basic';
import BarChart from './pages/BarChart';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <main>
          <Switch>
            <Route path="/basic" component={Basic}/>
            <Route path="/line-chart">
              <LineChart height={400} values={lineData}/>
            </Route>
            <Route path="/bar-chart" component={BarChart}/>
            <Route path="/basics" component={Basics}/>
            <Route path="/curved-line-chart" component={CurvedLineChart}/>
            <Route path="/react-with-d3" component={ReactWithD3Basic}/>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

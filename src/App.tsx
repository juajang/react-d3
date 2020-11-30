import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import 'antd/dist/antd.css';

import Basic from "./pages/Basic";
import Header from "./components/common/Header";

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <main>
          <Switch>
            <Route path="/basic" component={Basic}/>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default App;

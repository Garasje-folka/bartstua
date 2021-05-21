import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { HashRouter, Route } from 'react-router-dom';
import Home from './pages/home'


const root = document.getElementById('root');
if (root)
ReactDOM.render(
  <HashRouter>
      <div>
        <App />
        <Route exact path="/" component={Home} />
      </div>
    </HashRouter>,
  root
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

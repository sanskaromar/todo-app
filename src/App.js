import './App.css';
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Todo from './pages/todo'
import Home from './pages/home'
import ErrorPage from './pages/pageNotFound'

function App() {

  return (
    <div id = "main">
      <BrowserRouter>
        <header className="text-center text-5xl p-8 font-mono text-green-500 bg-blue-200 dark:bg-gray-900">
          To Do App
        </header>
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/todo" component={Todo} exact />
          <Route component={ErrorPage} />
        </Switch>
      </BrowserRouter>
    </div>
    
  );
}

export default App;

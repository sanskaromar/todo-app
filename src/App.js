import './App.css';
import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Todo from './pages/todo'
import Home from './pages/home'
import ErrorPage from './pages/pageNotFound'

function App() {


  return (
    <BrowserRouter>
      <header className="text-center text-4xl p-8 font-mono bg-gray-900 text-gray-200">
        To Do App
      </header>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/todo" component={Todo} exact />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

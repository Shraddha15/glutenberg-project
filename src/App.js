import React from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import "./styles.scss";
import HomeComponent from "./components/HomeComponent/index";
import ListOfBooksComponent from "./components/ListOfBooksComponent";

export default function App() {
  return (
    <Router>
      <div className="App">
        <Link to="/" />
        <Link to="/category" />
        <Switch>
          <Route exact path="/" component={HomeComponent} />
          <Route exact path="/:category" component={ListOfBooksComponent} />
        </Switch>
      </div>
    </Router>
  );
}

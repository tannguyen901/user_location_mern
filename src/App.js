import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Users from "./user/pages/Users";
import Places from "./places/pages/Places";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/places/new" exact>
          <Places />
        </Route>
        <Redirect path="/" />
      </Switch>
    </Router>
  );
};

export default App;

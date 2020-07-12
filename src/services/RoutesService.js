import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "../pages/LoginPage";
import Home from "../pages/HomePage";
import NotFound from "../pages/NotFound";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" exact={true} component={Login} />
      <Route path="/home" exact={true} component={Home} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

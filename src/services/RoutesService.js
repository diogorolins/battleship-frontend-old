import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "../pages/LoginPage";
import Home from "../pages/HomePage";
import GameConfig from "../pages/GameConfigPage";
import Game from "../pages/GamePage";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Login} />
      <Route path="/home" exact={true} component={Home} />
      <Route path="/gameconfig" exact={true} component={GameConfig} />
      <Route path="/game" exact={true} component={Game} />
      <Route component={Login} />
    </Switch>
  </BrowserRouter>
);

export default Routes;

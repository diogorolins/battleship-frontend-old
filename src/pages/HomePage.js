import React from "react";
import { withRouter } from "react-router-dom";

import { isAuthenticated } from "../services/AuthService";

class Home extends React.Component {
  componentDidMount() {
    if (!isAuthenticated()) {
      this.props.history.push("/login");
    }
  }
  render() {
    return "Home page";
  }
}

export default withRouter(Home);

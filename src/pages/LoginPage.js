import React from "react";
import { withRouter } from "react-router-dom";

import { login } from "../services/AuthService";
import LoginForm from "../components/LoginForm";
import ApiService from "../services/ApiService";
import Snack from "../services/SnackService";

class Login extends React.Component {
  state = {
    login: "",
    password: "",
    open: false,
    severity: "error",
    errors: [],
  };

  submitFormLogin = async (event) => {
    event.preventDefault();

    const credentials = {
      email: this.state.login,
      password: this.state.password,
    };
    try {
      const response = await ApiService.login(credentials);
      login(response.data.token);
      this.props.history.push("/home");
    } catch (e) {
      this.setState({
        open: true,
        errors: ["Login ou senha inválidos"],
      });
    }
  };

  fillFormFields = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  closeSnack = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { login, password, open, severity, errors } = this.state;
    return (
      <>
        <Snack
          openSnack={open}
          closeSnack={this.closeSnack}
          message={errors}
          severity={severity}
        />
        <LoginForm
          submitFormLogin={this.submitFormLogin}
          login={login}
          password={password}
          fillFormFields={this.fillFormFields}
        />
      </>
    );
  }
}

export default withRouter(Login);

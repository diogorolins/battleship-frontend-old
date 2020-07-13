import React from "react";
import { withRouter } from "react-router-dom";

import FormValidation from "../services/FormValidation";
import { login, isAuthenticated } from "../services/AuthService";
import LoginForm from "../components/LoginForm";
import Signin from "../components/SigninForm";
import ApiService from "../services/ApiService";
import Snack from "../services/SnackService";

class Login extends React.Component {
  state = {
    login: "",
    passwordLogin: "",
    name: "",
    email: "",
    password: "",
    open: false,
    severity: "error",
    errors: [],
    openSignin: false,
  };

  componentDidMount() {
    if (isAuthenticated()) {
      this.props.history.push("/home");
    }
  }

  submitFormLogin = async (event) => {
    event.preventDefault();

    const credentials = {
      email: this.state.login,
      password: this.state.passwordLogin,
    };
    try {
      const response = await ApiService.login(credentials);
      login(response.data.token);
      this.props.history.push("/home");
    } catch (e) {
      this.setState({
        open: true,
        severity: "error",
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

  canceSignin = () => {
    this.setState({
      openSignin: false,
    });
  };

  openModalSignin = () => {
    this.setState({
      openSignin: true,
    });
  };

  saveUser = async () => {
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    };

    const errors = FormValidation(user);
    if (errors.length > 0) {
      this.setState({
        open: true,
        severity: "error",
        errors: ["Todos os campos são obrigatórios"],
      });
    } else {
      const response = await ApiService.saveUser(user);
      if (response.status === 201) {
        this.setState({
          open: true,
          errors: ["Usuário cadastrado com sucesso."],
          severity: "success",
          openSignin: false,
        });
      } else {
        this.setState({
          open: true,
          severity: "error",
          errors: response.data.errors[0].message,
        });
      }
    }
  };

  render() {
    const {
      login,
      passwordLogin,
      open,
      severity,
      errors,
      openSignin,
    } = this.state;
    return (
      <>
        <Signin
          openSignin={openSignin}
          canceSignin={this.canceSignin}
          fillFormFields={this.fillFormFields}
          saveUser={this.saveUser}
        />
        <Snack
          openSnack={open}
          closeSnack={this.closeSnack}
          message={errors}
          severity={severity}
        />
        <LoginForm
          submitFormLogin={this.submitFormLogin}
          login={login}
          passwordLogin={passwordLogin}
          fillFormFields={this.fillFormFields}
          openModalSignin={this.openModalSignin}
        />
      </>
    );
  }
}

export default withRouter(Login);

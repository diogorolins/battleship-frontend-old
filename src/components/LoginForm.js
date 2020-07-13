import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const LoginForm = (props) => {
  const {
    submitFormLogin,
    login,
    passwordLogin,
    fillFormFields,
    openModalSignin,
  } = props;

  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Batalha Naval
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="login"
            label="Email"
            name="login"
            autoComplete="email"
            autoFocus
            value={login}
            onChange={fillFormFields}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="passwordLogin"
            label="Senha"
            type="password"
            id="passwordLogin"
            autoComplete="current-password"
            value={passwordLogin}
            onChange={fillFormFields}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitFormLogin}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Esqueceu a Senha?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2" onClick={openModalSignin}>
                {"Criar nova conta"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
export default LoginForm;

import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

const Signin = (props) => {
  const { openSignin, canceSignin, fillFormFields, saveUser } = props;
  return (
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      open={openSignin}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Cadastro</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="name"
              label="Nome"
              name="name"
              onChange={fillFormFields}
              autoFocus
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              id="email"
              label="Email"
              name="email"
              onChange={fillFormFields}
            />
          </Grid>
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              label="Senha"
              type="password"
              id="password"
              name="password"
              onChange={fillFormFields}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={canceSignin} ßcolor="primary">
          Cancel
        </Button>
        <Button onClick={saveUser} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Signin;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  h1: {
    textAlign: "center",
    fontSize: theme.typography.pxToRem(40),
    fontWeight: theme.typography.fontWeightBold,
    color: "blue",
    paddingTop: "50px",
  },
}));

const Winner = (props) => {
  const classes = useStyles();
  const { backButton, winner } = props;
  return (
    <>
      <h1 className={classes.h1}>
        Você {winner ? "venceu" : "perdeu"} o jogo.
      </h1>
      <Button
        onClick={backButton}
        fullWidth
        variant="contained"
        color="primary"
      >
        Voltar
      </Button>
    </>
  );
};
export default Winner;

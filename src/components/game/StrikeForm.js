import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme) => ({
  field: {
    marginTop: "12px",
    marginLeft: "10px",
    borderRadius: "4px",
    width: "60px",
    border: "1px solid  blue",
  },
  button: {
    marginTop: "10px",
    marginLeft: "10px",
    height: "45px",
    borderRadius: "4px",
    width: "100px",
  },
  h1: {
    textAlign: "center",
    fontSize: theme.typography.pxToRem(16),
    fontWeight: theme.typography.fontWeightBold,
    color: "red",
  },
}));

const StrikeForm = (props) => {
  const classes = useStyles();
  const {
    playerTurn,
    strike,
    fillStrikeField,
    strikeField,
    refresh,
    dataCharged,
  } = props;
  const inputProps = {
    maxLength: 3,
  };
  return (
    <>
      {playerTurn ? (
        <>
          <TextField
            className={classes.field}
            size="small"
            variant="outlined"
            autoFocus
            id="strikeField"
            name="strikeField"
            onChange={fillStrikeField}
            value={strikeField}
            inputProps={inputProps}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={strike}
          >
            Atacar
          </Button>
        </>
      ) : (
        <>
          <h1 className={classes.h1}>Aguarde o ataque inimigo</h1>

          {dataCharged ? (
            <Button
              variant="contained"
              color="secondary"
              onClick={refresh}
              fullWidth
            >
              Atualizar
            </Button>
          ) : (
            <LinearProgress color="secondary" />
          )}
        </>
      )}
    </>
  );
};

export default StrikeForm;

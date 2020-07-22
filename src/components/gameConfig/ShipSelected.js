import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
  },
  h1: {
    textAlign: "center",
    fontSize: theme.typography.pxToRem("22"),
    fontWeight: theme.typography.fontWeightBold,
    color: "MediumBlue",
  },
}));

const ShipSelected = (props) => {
  const classes = useStyles();
  const { shipType, goToNextShip } = props;
  return (
    <>
      <h1 className={classes.h1}>
        {shipType.name} - Tamanho: {shipType.size}{" "}
      </h1>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        className={classes.root}
        onClick={() => goToNextShip(shipType)}
      >
        Próximo Barco
      </Button>
    </>
  );
};

export default ShipSelected;

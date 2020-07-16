import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  rol: {
    height: "45px",
    width: "45px",
    border: "2px solid red",
    textAlign: "center",
    color: "red",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const CellAd = (props) => {
  const classes = useStyles();
  const { cellId } = props;

  return <td className={classes.rol}>{cellId}</td>;
};

export default CellAd;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { colorCell } from "../../services/ColorService";

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
  rolStike: {
    height: "45px",
    width: "45px",
    border: "2px solid red",
    textAlign: "center",
    color: "black",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: colorCell.adversary.strike,
    opacity: "70%",
  },
  rolMissed: {
    height: "45px",
    width: "45px",
    border: "2px solid red",
    textAlign: "center",
    color: "black",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: colorCell.adversary.missed,
    opacity: "70%",
  },
}));

const CellAd = (props) => {
  const classes = useStyles();
  const { cellId, strikesMade } = props;
  var classCell = classes.rol;

  if (
    strikesMade.filter((s) => s.position === cellId && s.hit === true).length >
    0
  ) {
    classCell = classes.rolStike;
  }

  if (
    strikesMade.filter((s) => s.position === cellId && s.hit === false).length >
    0
  ) {
    classCell = classes.rolMissed;
  }

  return <td className={classCell}>{cellId}</td>;
};

export default CellAd;

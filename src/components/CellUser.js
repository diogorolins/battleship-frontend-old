import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  rol: {
    height: "45px",
    width: "45px",
    border: "2px solid blue",
    textAlign: "center",
    color: "blue",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  rolDone: {
    height: "45px",
    width: "45px",
    border: "2px solid blue",
    textAlign: "center",
    color: "black",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "green",
    opacity: "70%",
  },
}));

const CellUser = (props) => {
  const classes = useStyles();
  const { cellId, ships, player } = props;
  const shipSelected = [];
  var classCell = "";
  if (ships) {
    ships.forEach((s) => {
      if (s.player.id === player) {
        s.position.forEach((e) => shipSelected.push(e.position));
      }
    });
  }

  if (shipSelected.includes(cellId)) {
    classCell = classes.rolDone;
  } else {
    classCell = classes.rol;
  }

  return <td className={classCell}>{cellId}</td>;
};

export default CellUser;

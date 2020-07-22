import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { colorCell } from "../../services/ColorService";

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
    backgroundColor: colorCell.user.ship,
    opacity: "70%",
  },
  rolHited: {
    height: "45px",
    width: "45px",
    border: "2px solid blue",
    textAlign: "center",
    color: "black",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: colorCell.user.hited,
    opacity: "70%",
  },
  rolReceived: {
    height: "45px",
    width: "45px",
    border: "2px solid blue",
    textAlign: "center",
    color: "black",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: colorCell.user.water,
    opacity: "70%",
  },
}));

const CellUser = (props) => {
  const classes = useStyles();
  const { cellId, ships, player, strikesReceived } = props;
  const shipSelected = [];
  var classCell = classes.rol;

  if (ships) {
    ships.forEach((s) => {
      if (s.player.id === player) {
        s.position.forEach((e) =>
          shipSelected.push({ position: e.position, hit: e.hit })
        );
      }
    });
  }

  if (
    shipSelected.filter((s) => s.position === cellId && s.hit === "HITED")
      .length > 0
  ) {
    classCell = classes.rolHited;
  }
  if (
    shipSelected.filter((s) => s.position === cellId && s.hit === "CLEAN")
      .length > 0
  ) {
    classCell = classes.rolDone;
  }

  if (strikesReceived.filter((s) => s.position === cellId).length > 0) {
    classCell = classes.rolReceived;
  }

  return <td className={classCell}>{cellId}</td>;
};

export default CellUser;

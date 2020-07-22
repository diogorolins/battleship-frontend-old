import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { colorCell } from "../../services/ColorService";

const useStyles = makeStyles((theme) => ({
  root: {},
  rol: {
    height: "50px",
    width: "50px",
    border: "2px solid blue",
    textAlign: "center",
    color: "black",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  rolSelected: {
    height: "50px",
    width: "50px",
    border: "2px solid blue",
    textAlign: "center",
    color: "black",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: colorCell.config.selected,
    opacity: "70%",
  },
  rolDone: {
    height: "50px",
    width: "50px",
    border: "2px solid blue",
    textAlign: "center",
    color: "black",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: colorCell.config.finished,
    opacity: "70%",
  },
}));

const ConfigShipsCell = (props) => {
  const classes = useStyles();
  const { cellId, selectCell, selectedCells, ships } = props;

  const alreadySelected = [];
  ships.forEach((s) =>
    s.position.forEach((e) => alreadySelected.push(e.position))
  );
  var classShip = "";
  if (selectedCells.includes(cellId)) {
    classShip = classes.rolSelected;
  } else {
    classShip = classes.rol;
  }
  if (alreadySelected.includes(cellId)) {
    classShip = classes.rolDone;
  }

  return (
    <td className={classShip} onClick={() => selectCell(cellId)}>
      {cellId}
    </td>
  );
};

export default ConfigShipsCell;

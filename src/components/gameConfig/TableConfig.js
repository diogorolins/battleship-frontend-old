import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ConfigShipsCell from "./ConfigShipsCell";
import { table } from "../../services/TableGameServices";

const col = table.col;
const rol = table.rol;

const useStyles = makeStyles((theme) => ({
  root: {
    border: "2px solid blue",
    margin: "auto",
    marginTop: "20px",
    borderRadius: "4px",
    flexGrow: 1,
  },
  col: {
    border: "2px solid blue",
  },
  h1: {
    textAlign: "center",
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
    color: "MediumBlue",
  },
}));

const TableConfig = (props) => {
  const { selectCell, selectedCells, ships } = props;
  const classes = useStyles();

  return (
    <>
      <h1 className={classes.h1}>
        Selecione a posição do Barco e clique no botão no fim da página
      </h1>
      <table className={classes.root}>
        <tbody>
          {col.map((c) => (
            <tr key={c} className={classes.col}>
              {rol.map((r) => (
                <ConfigShipsCell
                  key={r}
                  cellId={r + c}
                  selectCell={selectCell}
                  selectedCells={selectedCells}
                  ships={ships}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableConfig;

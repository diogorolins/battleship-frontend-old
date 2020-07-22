import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CellUser from "./CellUser";
import { table } from "../../services/TableGameServices";

const col = table.col;
const rol = table.rol;

const useStyles = makeStyles((theme) => ({
  root: {
    border: "2px solid blue",
    marginTop: "30px",
    marginLeft: "10px",
    borderRadius: "4px",
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

const TableUser = (props) => {
  const { ships, player, strikesReceived } = props;

  const classes = useStyles();

  return (
    <>
      <h1 className={classes.h1}>Meu tabuleiro</h1>
      <table className={classes.root}>
        <tbody>
          {col.map((c) => (
            <tr key={c} className={classes.col}>
              {rol.map((r) => (
                <CellUser
                  key={r}
                  cellId={r + c}
                  ships={ships}
                  player={player}
                  strikesReceived={strikesReceived}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableUser;

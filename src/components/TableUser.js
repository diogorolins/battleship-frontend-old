import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CellUser from "./CellUser";

const col = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const rol = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

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
  const { ships, player } = props;

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

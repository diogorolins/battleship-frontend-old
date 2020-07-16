import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CellAd from "./CellAd";

const col = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const rol = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

const useStyles = makeStyles((theme) => ({
  root: {
    border: "2px solid red",
    marginTop: "30px",
    marginLeft: "10px",
    borderRadius: "4px",
  },
  col: {
    border: "2px solid red",
  },
  rol: {
    border: "2px solid red",
    textAlign: "center",
    color: "red",
    borderRadius: "4px",
    fontWeight: "bold",
  },
  h1: {
    textAlign: "center",
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
    color: "red",
  },
}));

const TableAd = () => {
  const classes = useStyles();

  return (
    <>
      <h1 className={classes.h1}>Tabuleiro do adversário</h1>
      <table className={classes.root}>
        <tbody>
          {col.map((c) => (
            <tr key={c} className={classes.col}>
              {rol.map((r) => (
                <CellAd key={r} cellId={r + c} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableAd;

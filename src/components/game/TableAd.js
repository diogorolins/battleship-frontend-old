import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CellAd from "./CellAd";
import { table } from "../../services/TableGameServices";

const col = table.col;
const rol = table.rol;

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
  h1: {
    textAlign: "center",
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightBold,
    color: "red",
  },
}));

const TableAd = (props) => {
  const classes = useStyles();
  const { strikesMade } = props;
  return (
    <>
      <h1 className={classes.h1}>Tabuleiro do adversário</h1>
      <table className={classes.root}>
        <tbody>
          {col.map((c) => (
            <tr key={c} className={classes.col}>
              {rol.map((r) => (
                <CellAd key={r} cellId={r + c} strikesMade={strikesMade} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default TableAd;

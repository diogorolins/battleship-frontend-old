import React from "react";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core/styles";
import ShipSelected from "./ShipSelected";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "20px",
  },
  h1: {
    textAlign: "center",
    fontSize: theme.typography.pxToRem("22"),
    fontWeight: theme.typography.fontWeightBold,
    color: "MediumBlue",
  },
}));

const ConfigShips = (props) => {
  const classes = useStyles();
  const {
    shipTypes,
    shipAtivo,
    goToNextShip,
    startGame,
    waiting,
    refresh,
  } = props;

  return (
    <div>
      {shipTypes.map((s) =>
        shipAtivo === s.id ? (
          <ShipSelected key={s.id} shipType={s} goToNextShip={goToNextShip} />
        ) : (
          ""
        )
      )}
      {shipAtivo > shipTypes.length ? (
        !waiting ? (
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.root}
            onClick={startGame}
          >
            Iniciar Jogo
          </Button>
        ) : (
          <>
            <LinearProgress />
            <h1 className={classes.h1}>Aguardando o outo jogador</h1>
            <LinearProgress />
            <Button
              variant="contained"
              color="secondary"
              onClick={refresh}
              fullWidth
            >
              Atualizar
            </Button>
          </>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default ConfigShips;

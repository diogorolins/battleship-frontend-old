import React from "react";
import Grid from "@material-ui/core/Grid";
import ApiService from "../services/ApiService";
import { logout, getToken, isAuthenticated } from "../services/AuthService";
import Header from "../components/Header";
import TableAd from "../components/TableAd";
import TableUser from "../components/TableUser";
import StrikeForm from "../components/StrikeForm";
import { table } from "../services/TableGameServices";
import Snack from "../services/SnackService";

import Winner from "../components/Winner";

const col = table.col;
const rol = table.rol;

class Game extends React.Component {
  state = {
    player: {
      id: "",
      name: "",
      email: "",
    },
    gameData: "",
    strikesReceived: [],
    strikesMade: [],
    strikeField: "",
    openSnack: false,
    severity: "error",
    errors: [],
    dataCharged: false,
    win: false,
    winner: "",
  };
  token = getToken().token;
  game = 1; //this.props.location.state.game;

  componentDidMount() {
    if (!isAuthenticated()) {
      this.props.history.push("/");
    } else {
      this.getPlayer();
      this.getGameData();
    }
  }

  fillStrikeField = (event) => {
    const { value } = event.target;
    if (isNaN(value)) {
      this.setState({
        strikeField: value.toUpperCase(),
      });
    } else {
      this.setState({
        strikeField: value,
      });
    }
  };

  strike = async () => {
    if (this.checkStrikeIsValid()) {
      const strike = {
        game: { id: this.game },
        player: {
          id: this.state.gameData.players.filter(
            (p) => p.id !== this.state.player.id
          )[0].id,
        },
        position: this.state.strikeField,
      };

      const response = await ApiService.strike(strike, this.token);
      this.checkIfStrikeGetShip(response.data);
      this.checkIfGameEnd(response.data);
      this.getGameData();
    } else {
      this.setState({
        openSnack: true,
        severity: "error",
        errors: ["Valor inválido para o ataque."],
      });
    }
  };

  checkIfStrikeGetShip = (strike) => {
    if (strike.hit) {
      this.checkIfShipWasDestroyed(strike);
    } else {
      this.setState({
        openSnack: true,
        severity: "info",
        errors: ["Você acertou a água."],
      });
    }
  };

  checkIfGameEnd = (strike) => {
    const allPositions = [];
    const myShips = strike.game.ships.filter(
      (p) => p.player.id !== this.state.player.id
    );
    myShips.forEach((m) => {
      m.position.forEach((p) => {
        allPositions.push(p.hit);
      });
    });
    if (!allPositions.includes("CLEAN")) {
      this.setState({ win: true, winner: true });
    }
  };

  checkIfILost = (game) => {
    const allPositions = [];
    const myShips = game.ships.filter(
      (p) => p.player.id === this.state.player.id
    );
    myShips.forEach((m) => {
      m.position.forEach((p) => {
        allPositions.push(p.hit);
      });
    });
    if (!allPositions.includes("CLEAN")) {
      this.setState({ win: true, winner: false });
    }
  };

  checkIfShipWasDestroyed = (strike) => {
    const ships = strike.game.ships.filter(
      (p) => p.player.id !== this.state.player.id
    );
    const shipStriked = ships.filter((s) =>
      s.position.map((m) => m.position).includes(strike.position)
    )[0];

    const shipWasDestroyed = shipStriked.position.filter(
      (s) => s.hit === "CLEAN"
    );

    if (shipWasDestroyed.length > 0) {
      this.setState({
        openSnack: true,
        severity: "warning",
        errors: ["Você acertou um barco do adversário."],
      });
    } else {
      this.setState({
        openSnack: true,
        severity: "success",
        errors: ["Você destruiu um barco do adversário."],
      });
    }
  };

  checkStrikeIsValid = () => {
    var numbers = [];
    var letters = [];
    const strike = this.state.strikeField.split(" ");

    strike.forEach((s) => numbers.push(parseInt(s.replace(/[^0-9]/g, ""))));
    strike.forEach((s) => letters.push(s.replace(/[^A-Z]/g, "")));
    const numberExists = col.includes(parseInt(numbers.join("")));
    const letterExists = rol.includes(letters.join(""));

    if (numberExists && letterExists) {
      return true;
    }
    return false;
  };

  getGameData = async () => {
    try {
      const response = await ApiService.getGame(this.game, this.token);
      this.setState({
        gameData: response.data,
        strikeField: "",
        dataCharged: true,
      });
      this.checkIfILost(response.data);
      this.getStrikesReceived();
      this.getStrikesMade();
    } catch (e) {
      console.log(e);
    }
  };

  refresh = () => {
    this.getGameData();
  };

  getPlayer = async () => {
    try {
      const response = await ApiService.getUser(
        getToken().email,
        getToken().token
      );
      this.setState({
        player: {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
        },
      });
    } catch (e) {
      console.log(e);
    }
  };

  getStrikesReceived = async () => {
    try {
      const response = await ApiService.getStrikesByGame(this.game, this.token);
      const strikesReceived = response.data.filter(
        (s) => s.player.id === this.state.player.id && s.hit === false
      );
      this.setState({
        strikesReceived,
      });
    } catch (e) {
      console.log(e);
    }
  };

  getStrikesMade = async () => {
    try {
      const response = await ApiService.getStrikesByGame(this.game, this.token);
      this.setState({
        strikesMade: response.data.filter(
          (s) => s.player.id !== this.state.player.id
        ),
      });
    } catch (e) {
      console.log(e);
    }
  };

  logoutUser = async (id) => {
    try {
      await ApiService.logoff(id, this.token);
      logout();
      this.props.history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  closeSnack = () => {
    this.setState({
      openSnack: false,
    });
  };

  backButton = () => {
    this.props.history.push("/home");
  };

  render() {
    const {
      player,
      gameData,
      strikesReceived,
      strikesMade,
      strikeField,
      openSnack,
      severity,
      errors,
      dataCharged,
      win,
      winner,
    } = this.state;
    return (
      <>
        <Header logoutUser={this.logoutUser} player={player} />
        <Snack
          openSnack={openSnack}
          closeSnack={this.closeSnack}
          message={errors}
          severity={severity}
          invitesReceived={0}
        />

        {win ? (
          <Winner backButton={this.backButton} winner={winner} />
        ) : (
          <Grid container spacing={5} justify="center">
            <Grid item>
              <TableUser
                ships={gameData.ships}
                player={player.id}
                strikesReceived={strikesReceived}
              />
              <StrikeForm
                playerTurn={
                  gameData.playerTurn
                    ? gameData.playerTurn.id === player.id
                    : ""
                }
                strike={this.strike}
                fillStrikeField={this.fillStrikeField}
                strikeField={strikeField}
                refresh={this.refresh}
                dataCharged={dataCharged}
              />
            </Grid>
            <Grid item>
              <TableAd strikesMade={strikesMade} />
            </Grid>
          </Grid>
        )}
      </>
    );
  }
}

export default Game;

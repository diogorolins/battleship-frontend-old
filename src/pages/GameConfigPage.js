import React from "react";
import { withRouter } from "react-router-dom";

import ApiService from "../services/ApiService";
import Header from "../components/Header";
import { logout, getToken, isAuthenticated } from "../services/AuthService";
import TableConfig from "../components/TableConfig";
import ConfigShips from "../components/ConfigShips";
import Snack from "../services/SnackService";

class GameConfig extends React.Component {
  state = {
    player: {
      id: "",
      name: "",
      email: "",
    },
    shipTypes: [],
    shipAtivo: 1,
    selectedCells: [],
    openSnack: false,
    severity: "error",
    errors: [],
    ships: [],
    positionsLeft: 0,
    waiting: false,
  };
  token = getToken().token;
  game = this.props.location.state.game;

  componentDidMount() {
    if (!isAuthenticated()) {
      this.props.history.push("/");
    } else {
      this.getShipTypes();
      this.getPlayer();
    }
  }

  getShipTypes = async () => {
    const response = await ApiService.getShipTypes(this.token);
    this.setState({
      shipTypes: response.data,
    });
  };

  goToNextShip = (type) => {
    if (this.checkShipComplete(this.state.selectedCells, type)) {
      const ship = {
        type: type.id,
        player: this.state.player.id,
        position: this.state.selectedCells.map((s) => {
          return { position: s };
        }),
      };

      this.setState({
        shipAtivo: this.state.shipAtivo + 1,
        openSnack: true,
        severity: "success",
        errors: ["Barco adicionado com sucesso."],
        ships: [...this.state.ships, ship],
        selectedCells: [],
      });
    } else {
      this.setState({
        openSnack: true,
        severity: "error",
        errors: ["O formato do barco não é valido."],
      });
    }
  };

  startGame = async () => {
    const response = await ApiService.sendShips(
      this.game,
      this.state.ships,
      this.token
    );
    if (response.data.status === "STARTED") {
      this.props.history.push({
        pathname: "/game",
        state: { game: this.game },
      });
    } else {
      this.setState({
        waiting: true,
      });
      this.waitForUser();
    }
  };

  waitForUser = async () => {
    const response = await ApiService.getGame(this.game, this.token);
    if (response.data.status === "STARTED") {
      this.props.history.push({
        pathname: "/game",
        state: { game: this.game },
      });
    }
    //this.waitForUser();
  };

  checkShipComplete = (cells, type) => {
    if (cells.length !== type.size) {
      return false;
    }
    var numbers = [];
    var letters = [];
    cells.forEach((s) => numbers.push(parseInt(s.replace(/[^0-9]/g, ""))));
    cells.forEach((s) => letters.push(s.replace(/[^A-Z]/g, "")));

    const numbersOrdered = numbers
      .sort(this.sortfunction)
      .filter((n, i) => numbers.sort(this.sortfunction).indexOf(n) === i);

    const lettersOrdered = letters
      .sort()
      .filter((l, i) => letters.sort().indexOf(l) === i);

    if (numbersOrdered.length !== 1 && lettersOrdered.length !== 1) {
      return false;
    }
    const numberSequence = numbersOrdered.filter((n, index, arr) => {
      if (index !== arr.length - 1) {
        return parseInt(arr[index + 1]) === parseInt(n) + 1;
      } else {
        return true;
      }
    });

    const letterSequence = lettersOrdered.filter((n, index, arr) => {
      if (index !== arr.length - 1) {
        return arr[index + 1] === this.nextLetter(n);
      } else {
        return true;
      }
    });

    if (
      numberSequence.length !== numbersOrdered.length ||
      letterSequence.length !== lettersOrdered.length
    ) {
      return false;
    }

    return true;
  };

  sortfunction = (a, b) => {
    return a - b;
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

  logoutUser = async (id) => {
    try {
      await ApiService.logoff(id, this.token);
      logout();
      this.props.history.push("/");
    } catch (e) {
      console.log(e);
    }
  };

  selectCell = (cell) => {
    if (!this.checkAlreadySelected(cell)) {
      const alreadyChecked = this.state.selectedCells.indexOf(cell);
      if (alreadyChecked >= 0) {
        this.setState({
          selectedCells: [...this.state.selectedCells].filter(
            (s) => s !== cell
          ),
        });
      } else {
        this.setState({
          selectedCells: [...this.state.selectedCells, cell],
        });
      }
    }
  };

  checkAlreadySelected = (cell) => {
    const alreadySelected = [];
    this.state.ships.forEach((s) =>
      s.position.forEach((e) => alreadySelected.push(e.position))
    );
    return alreadySelected.includes(cell);
  };

  nextLetter = (s) => {
    return s.replace(/([a-zA-Z])[^a-zA-Z]*$/, function (a) {
      var c = a.charCodeAt(0);

      return String.fromCharCode(++c);
    });
  };

  closeSnack = () => {
    this.setState({
      openSnack: false,
    });
  };

  render() {
    const {
      player,
      shipTypes,
      selectedCells,
      shipAtivo,
      openSnack,
      errors,
      severity,
      ships,
      positionsLeft,
      waiting,
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
        <TableConfig
          selectCell={this.selectCell}
          selectedCells={selectedCells}
          ships={ships}
          positionsLeft={positionsLeft}
        />
        <ConfigShips
          shipTypes={shipTypes}
          shipAtivo={shipAtivo}
          goToNextShip={this.goToNextShip}
          startGame={this.startGame}
          waiting={waiting}
        />
      </>
    );
  }
}

export default withRouter(GameConfig);

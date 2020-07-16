import React from "react";
import Grid from "@material-ui/core/Grid";
import ApiService from "../services/ApiService";
import { logout, getToken, isAuthenticated } from "../services/AuthService";
import Header from "../components/Header";
import TableAd from "../components/TableAd";
import TableUser from "../components/TableUser";

class Game extends React.Component {
  state = {
    player: {
      id: "",
      name: "",
      email: "",
    },
    gameData: "",
  };
  token = getToken().token;
  game = 1; //this.props.location.state.game;

  async componentDidMount() {
    if (!isAuthenticated()) {
      this.props.history.push("/");
    } else {
      const response = await ApiService.getGame(this.game, this.token);
      this.setState({
        gameData: response.data,
      });
      this.getPlayer();
    }
  }

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

  render() {
    const { player, gameData } = this.state;
    return (
      <>
        <Header logoutUser={this.logoutUser} player={player} />
        <Grid container spacing={5} justify="center">
          <Grid item>
            <TableUser ships={gameData.ships} player={player.id} />
          </Grid>
          <Grid item>
            <TableAd />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default Game;

import React from "react";
import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import ApiService from "../services/ApiService";
import Header from "../components/Header";
import { isAuthenticated, logout, getToken } from "../services/AuthService";
import LoggedPlayers from "../components/home/LoggedPlayers";
import InvitesSent from "../components/home/InvitesSent";
import InvitesReceived from "../components/home/InvitesReceived";

class Home extends React.Component {
  state = {
    player: {
      id: "",
      name: "",
      email: "",
    },
    loggedPlayers: [],
    invitesSent: [],
    invitesReceived: [],
    gameId: "",
  };

  token = "";

  componentDidMount() {
    if (!isAuthenticated()) {
      this.props.history.push("/");
    } else {
      this.token = getToken().token;
      this.getPlayer();
      this.getLoggedPlayers();
      this.invitesSent();
      this.invitesReceived();
    }
  }

  refresh = () => {
    this.getLoggedPlayers();
    this.invitesSent();
    this.invitesReceived();
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

  getLoggedPlayers = async () => {
    const response = await ApiService.getLoggedPlayers(this.token);
    this.setState({
      loggedPlayers: response.data,
    });
    //setTimeout(this.getLoggedPlayers(), 5000);
    //this.getLoggedPlayers();
  };

  invitePlayer = async (playerId) => {
    const playerInvite = {
      playerId,
    };
    try {
      await ApiService.invitePlayer(playerInvite, this.token);
      this.invitesSent();
    } catch (e) {
      console.log(e);
    }
  };

  invitesSent = async () => {
    const response = await ApiService.getInvitesSent(this.token);
    this.setState({
      invitesSent: response.data,
    });
    //setTimeout(this.invitesSent(), 5000);
    //this.invitesSent();
  };

  invitesReceived = async () => {
    const response = await ApiService.getInvitesReceived(this.token);
    this.setState({
      invitesReceived: response.data,
    });
    //setTimeout(this.invitesReceived(), 5000);
    // this.invitesReceived();
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

  declineInvite = async (id) => {
    try {
      await ApiService.declineInvite(id, this.token);
      this.invitesReceived();
    } catch (e) {
      console.log(e);
    }
  };

  acceptInvite = async (id) => {
    try {
      const response = await ApiService.acceptInvite(id, this.token);
      this.props.history.push({
        pathname: "/gameconfig",
        state: { game: response.data.game.id },
      });
    } catch (e) {
      console.log(e);
    }
  };

  beginGame = (gameId) => {
    this.props.history.push({
      pathname: "/gameconfig",
      state: { game: gameId },
    });
  };

  render() {
    const { player, loggedPlayers, invitesSent, invitesReceived } = this.state;
    return (
      <>
        <Header
          logoutUser={this.logoutUser}
          player={player}
          invitesReceived={invitesReceived.length}
        />

        <InvitesReceived
          invitesReceived={invitesReceived}
          declineInvite={this.declineInvite}
          acceptInvite={this.acceptInvite}
        />
        <LoggedPlayers
          loggedPlayers={loggedPlayers}
          invitePlayer={this.invitePlayer}
          invitesSent={invitesSent}
        />
        <InvitesSent invitesSent={invitesSent} beginGame={this.beginGame} />
        <Button
          variant="contained"
          color="secondary"
          onClick={this.refresh}
          fullWidth
        >
          Atualizar
        </Button>
      </>
    );
  }
}

export default withRouter(Home);

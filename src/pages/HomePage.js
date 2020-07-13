import React from "react";
import { withRouter } from "react-router-dom";

import ApiService from "../services/ApiService";
import Header from "../components/Header";
import { isAuthenticated, logout, getToken } from "../services/AuthService";
import LoggedPlayers from "../components/LoggedPlayers";
import InvitedSent from "../components/InvitedSent";
import InvitesReceived from "../components/InvitesReceived";

class Home extends React.Component {
  state = {
    player: {
      id: "",
      name: "",
      email: "",
    },
    loggedPlayers: [],
    invitesSent: [],
    invitesRece: [],
  };
  token = getToken().token;

  componentDidMount() {
    if (!isAuthenticated()) {
      this.props.history.push("/login");
    } else {
      this.getPlayer();
      this.getLoggedPlayers();
      this.invitesSent();
      this.invitesReceived();
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

  getLoggedPlayers = async () => {
    const response = await ApiService.getLoggedPlayers(this.token);
    this.setState({
      loggedPlayers: response.data,
    });
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
    // this.invitesSent();
  };

  invitesReceived = async () => {
    const response = await ApiService.getInvitesReceived(this.token);
    this.setState({
      invitesReceived: response.data,
    });
    //this.invitesReceived();
  };

  logoutUser = async (id) => {
    try {
      await ApiService.logoff(id, this.token);
      logout();
      this.props.history.push("/login");
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

  render() {
    const { player, loggedPlayers, invitesSent, invitesReceived } = this.state;
    return (
      <>
        <Header logoutUser={this.logoutUser} player={player} />
        <InvitesReceived
          invitesReceived={invitesReceived}
          declineInvite={this.declineInvite}
        />
        <LoggedPlayers
          loggedPlayers={loggedPlayers}
          invitePlayer={this.invitePlayer}
          invitesSent={invitesSent}
        />
        <InvitedSent invitesSent={invitesSent} />
      </>
    );
  }
}

export default withRouter(Home);

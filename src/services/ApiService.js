import axios from "axios";

//const urlBase = "https://battleship-b.herokuapp.com";
const urlBase = "http://localhost:8080";

const api = axios.create({
  baseURL: urlBase,
});

const ApiService = {
  login: async (creds) => await api.post("auth", creds),
  saveUser: async (user) =>
    await api.post("players", user).catch((error) => error.response),

  logoff: async (id, token) =>
    await api.patch(
      `auth/logoff/${id}`,
      {},
      {
        headers: { Authorization: "Bearer " + token },
      }
    ),
  getUser: async (email, token) =>
    await api.get(`players/email?email=${email}`, {
      headers: { Authorization: "Bearer " + token },
    }),
  getLoggedPlayers: async (token) =>
    await api.get("players/logged", {
      headers: { Authorization: "Bearer " + token },
    }),
  invitePlayer: async (playerInvited, token) =>
    await api.post("players/invite", playerInvited, {
      headers: { Authorization: "Bearer " + token },
    }),
  getInvitesSent: async (token) =>
    await api.get("players/invite/sent", {
      headers: { Authorization: "Bearer " + token },
    }),
  getInvitesReceived: async (token) =>
    await api.get("players/invite/received", {
      headers: { Authorization: "Bearer " + token },
    }),
  declineInvite: async (id, token) => {
    await api.patch(
      `players/invite/decline/${id}`,
      {},
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
  },
  acceptInvite: async (id, token) => {
    return await api.patch(
      `players/invite/accept/${id}`,
      {},
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
  },
  getShipTypes: async (token) =>
    await api.get("ships/types", {
      headers: { Authorization: "Bearer " + token },
    }),

  sendShips: async (gameId, ships, token) => {
    return await api.put(`games/${gameId}`, ships, {
      headers: { Authorization: "Bearer " + token },
    });
  },
  getGame: async (gameId, token) =>
    await api.get(`games/${gameId}`, {
      headers: { Authorization: "Bearer " + token },
    }),
  getStrikesByGame: async (gameId, token) =>
    await api.get(`games/strike/${gameId}`, {
      headers: { Authorization: "Bearer " + token },
    }),
  strike: async (strike, token) => {
    return await api.post("games/strike", strike, {
      headers: { Authorization: "Bearer " + token },
    });
  },
};
export default ApiService;

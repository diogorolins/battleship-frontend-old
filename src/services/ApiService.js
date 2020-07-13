import axios from "axios";

const urlBase = "http://192.168.0.116:8080";
//const urlBase = "http://localhost:8080";

const api = axios.create({
  baseURL: urlBase,
});

const ApiService = {
  login: async (creds) => await api.post("auth", creds),
  saveUser: async (user) =>
    api.post("players", user).catch((error) => error.response),

  logoff: async (id, token) =>
    api.patch(
      `auth/logoff/${id}`,
      {},
      {
        headers: { Authorization: "Bearer " + token },
      }
    ),
  getUser: async (email, token) =>
    api.get(`players/email?email=${email}`, {
      headers: { Authorization: "Bearer " + token },
    }),
  getLoggedPlayers: async (token) =>
    api.get("players/logged", {
      headers: { Authorization: "Bearer " + token },
    }),
  invitePlayer: async (playerInvited, token) =>
    api.post("players/invite", playerInvited, {
      headers: { Authorization: "Bearer " + token },
    }),
  getInvitesSent: async (token) =>
    api.get("players/invite/sent", {
      headers: { Authorization: "Bearer " + token },
    }),
  getInvitesReceived: async (token) =>
    api.get("players/invite/received", {
      headers: { Authorization: "Bearer " + token },
    }),
  declineInvite: async (id, token) => {
    api.patch(
      `players/invite/decline/${id}`,
      {},
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
  },
};
export default ApiService;

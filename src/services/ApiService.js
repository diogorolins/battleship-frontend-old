import axios from "axios";

const urlBase = "http://localhost:8080";

const api = axios.create({
  baseURL: urlBase,
});

const ApiService = {
  login: async (creds) => await api.post("auth", creds),
};
export default ApiService;

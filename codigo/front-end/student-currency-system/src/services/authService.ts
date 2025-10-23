import { api } from "./api";

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", { email, password });
    localStorage.setItem("token", data.token);
  },
  logout: () => {
    localStorage.removeItem("token");
  },
  getToken: () => localStorage.getItem("token"),
};

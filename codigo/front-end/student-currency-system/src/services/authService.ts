import { api } from "./api";

export const authService = {
  login: async (login: string, password: string) => {
    const { data } = await api.post("/auth/login", { login, password });

    localStorage.setItem("user", JSON.stringify(data));
    localStorage.setItem("role", data.role);
    localStorage.setItem("login", data.login);

    return data;
  },

  register: async (formData: any) => {
    const { data } = await api.post("/students", formData);
    return data;
  },

  registerCompany: async (formData: any) => {
    const { data } = await api.post("/companies", formData);
    return data;
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("login");
  },

  getUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getRole: () => localStorage.getItem("role"),
};

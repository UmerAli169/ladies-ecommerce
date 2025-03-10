import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized. Please login again");
    }
    throw error;
  }
);

export const register = async (data: any) => {
  try {
    const response = await api.post("/api/auth/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (data: any) => {
  try {
    const response = await api.post("login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post("logout");
  } catch (error) {
    throw error;
  }
};

export const recoverPassword = async (email: string) => {
  try {
    const response = await api.post("recover-password", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};
export const resetPassword = async (token: string, password: string) => {
  const response = await api.post("reset-password", { token, password });
  return response.data;
};
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
    const response = await api.post("/api/auth/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const recoverPassword = async (email: string) => {
  try {
    const response = await api.post("/api/auth/recover-password", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token: string, password: string) => {
  const response = await api.post(`/api/auth/reset-password/${token}`, {
    password,
  });
  return response.data;
};


export const googleLogin = async () => {
  try {
    window.location.href = "http://localhost:5000/api/auth/google"; 
  } catch (error) {
    console.error("Google login error:", error);
  }
};

export const getUser = async () => {
  try {
    const response = await api.get("/api/auth/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

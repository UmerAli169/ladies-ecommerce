import axios from "axios";
import { data } from "framer-motion/client";

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

// ✅ Register
export const register = async (data: any) => {
  try {
    const response = await api.post("/api/auth/register", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Login
export const login = async (data: any) => {
  try {
    const response = await api.post("/api/auth/login", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Recover Password
export const recoverPassword = async (email: string) => {
  try {
    const response = await api.post("/api/auth/recover-password", { email });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Reset Password
export const resetPassword = async (token: string, password: string) => {
  try {
    const response = await api.post(`/api/auth/reset-password/${token}`, { password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Google Login
export const googleLogin = async () => {
  try {
    window.location.href = "http://localhost:5000/api/auth/google";
  } catch (error) {
    console.error("Google login error:", error);
  }
};

// ✅ Get User Info
export const getUser = async () => {
  try {
    const response = await api.get("/api/auth/me");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Get All Products (Fixed Method: GET)
export const getAllProducts = async () => {
  try {
    const response = await api.get("/api/products/getAllProducts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Like Product (Fixed Endpoint & Method)
export const likeProduct = async (productId: string) => {
  try {
    const response = await api.put(`/api/products/like/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Dislike Product (Fixed Endpoint & Method)
export const dislikeProduct = async (productId: string) => {
  try {
    const response = await api.put(`/api/products/dislike/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const getProductById = async (productId: string) => {
  try {
    console.log(productId)
    const response = await api.put(`/api/products/getProductById/${productId}`);
    console.log(response.data,'productIdproductId')
    return response.data;
  } catch (error) {
    throw error;
  }
};
// ✅ Add to Cart (Fixed Endpoint)
export const addToCart = async (productId: string, quantity: number) => {
  try {
    const response = await api.post("/cart", { productId, quantity });
    return response.data;
  } catch (error) {
    throw error;
  }
};

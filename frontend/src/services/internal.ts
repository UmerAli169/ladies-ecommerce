import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      toast.error("Unauthorized. Please login again");
    }
    toast.error(error.response?.data?.message || "Something went wrong!");
    throw error;
  }
);

export const register = async (data:any) => {
  try {
    const response = await api.post("/api/auth/register", data);
    toast.success("Registration successful!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (data:any) => {
  try {
    const response = await api.post("/api/auth/login", data);
    toast.success("Login successful!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const recoverPassword = async (email:any) => {
  try {
    const response = await api.post("/api/auth/recover-password", { email });
    toast.success("Password recovery email sent!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token:any, password:any) => {
  try {
    const response = await api.post(`/api/auth/reset-password/${token}`, { password });
    toast.success("Password reset successful!");
    return response.data;
  } catch (error) {
    throw error;
  }
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

export const getAllProducts = async () => {
  try {
    const response = await api.get("/api/products/getAllProducts");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const likeProduct = async (productId: any) => {
  try {
    const response = await api.put(`/api/products/like/${productId}`);
    toast.success("Product liked!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const dislikeProduct = async (productId:any) => {
  try {
    const response = await api.put(`/api/products/dislike/${productId}`);
    toast.success("Product disliked!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (productId:any) => {
  try {
    const response = await api.put(`/api/products/getProductById/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (productId:any, quantity:any) => {
  try {
    const response = await api.post("/cart", { productId, quantity });
    toast.success("Product added to cart!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReview = async (formData:any) => {
  try {
    const response = await api.post("/api/reviews", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success("Review submitted successfully!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReviewsByProduct = async (productId:any) => {
  try {
    const response = await api.get(`/api/reviews/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReviewsByUser = async (userId:any) => {
  try {
    const response = await api.get(`/api/reviews/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteReview = async (reviewId:any) => {
  try {
    const response = await api.delete(`/api/reviews/${reviewId}`);
    toast.success("Review deleted successfully!");
    return response.data;
  } catch (error) {
    throw error;
  }
};
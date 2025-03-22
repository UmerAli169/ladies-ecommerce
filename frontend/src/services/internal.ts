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

export const register = async (data: any) => {
  try {
    const response = await api.post("/api/auth/register", data);
    toast.success("Registration successful!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const login = async (data: any) => {
  try {
    const response = await api.post("/api/auth/login", data);
    toast.success("Login successful!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const recoverPassword = async (email: any) => {
  try {
    const response = await api.post("/api/auth/recover-password", { email });
    toast.success("Password recovery email sent!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (token: any, password: any) => {
  try {
    const response = await api.post(`/api/auth/reset-password/${token}`, {
      password,
    });
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

export const getWishlist = async () => {
  try {
    const response = await api.get(`/api/products/getWishlist`);
    toast.success("Product getWishlist!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const toggleWishlist = async (id: string) => {
  try {
    console.log(id, "id");
    const response = await api.post(`/api/products/addToWishlist/${id}`);

    // Check response message to determine action
    if (response.data.message.includes("removed")) {
      toast.success(response.data.message);
    } else {
      toast.success(response.data.message);
    }

    return response.data;
  } catch (error) {
    toast.error("Something went wrong!");
    throw error;
  }
};

export const getProductById = async (productId: any) => {
  try {
    const response = await api.put(`/api/products/getProductById/${productId}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addToCart = async (productId: any, quantity: any) => {
  try {
    console.log(productId, "id");
    const response = await api.post("/api/products/addToCart", {
      productId,
      quantity,
    });
    toast.success("Product added to cart!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCart = async () => {
  try {
    const response = await api.get("/api/products/fetchCart");
    toast.success("Product added to cart!");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReview = async (formData: any) => {
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

export const getReviewsByProduct = async (productId: any) => {
  try {
    const response = await api.get(`/api/reviews/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getReviewsByUser = async (userId: any) => {
  try {
    const response = await api.get(`/api/reviews/user/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

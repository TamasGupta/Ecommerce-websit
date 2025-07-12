// src/action/productApi.ts

import axios from "axios";

const BASE_URL = "http://localhost:5000/api/products";

// 🔹 Upload product image
export const uploadProductImage = async (file: File, token: string) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.post(`${BASE_URL}/upload`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data.imageUrl;
};

// 🔹 Add new product
export const addProduct = async (productData: any, token: string) => {
  const res = await axios.post(BASE_URL, productData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 🔹 Get all products
export const getAllProducts = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

// 🔹 Get all tags
export const getAllTags = async () => {
  const res = await axios.get(`${BASE_URL}/tags`);
  return res.data;
};

// 🔹 Add a new tag (optional)
export const addNewTag = async (tagName: string) => {
  const res = await axios.post(`${BASE_URL}/tags`, { name: tagName });
  return res.data;
};

// 🔹 Delete product by ID
export const deleteProduct = async (productId: string, token: string) => {
  const res = await axios.delete(`${BASE_URL}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// 🔹 Update product by ID
export const updateProduct = async (
  productId: string,
  updatedData: any,
  token: string
) => {
  const res = await axios.put(`${BASE_URL}/${productId}`, updatedData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

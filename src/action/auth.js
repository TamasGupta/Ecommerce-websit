import axios from "axios";

const API_URL = "http://localhost:5000/api/users";

export const loginUser = async (email, password) => {
  try {
    console.log(email, password);
    const res = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    return { user: res.data.user, token: res.data.token };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

export const signupUser = async (name, email, password) => {
  try {
    const res = await axios.post(`${API_URL}/register`, {
      name,
      email,
      password,
    });
    localStorage.setItem("token", res.data.token);
    return { user: res.data.user, token: res.data.token };
  } catch (error) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};
export const logout = () => {
  localStorage.removeItem("token");
  setUser(null);
};

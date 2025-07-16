import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // adjusted to /api/auth if using authRoutes

// Define the shape of the user data
export interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
}

// Login function
export const loginUser = async (
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  try {
    const res = await axios.post<{ user: User; token: string }>(
      `${API_URL}/login`,
      { email, password }
    );
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// Signup function
export const signupUser = async (
  name: string,
  email: string,
  password: string
): Promise<{ user: User; token: string }> => {
  try {
    const res = await axios.post<{ user: User; token: string }>(
      `${API_URL}/register`,
      { name, email, password }
    );
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Signup failed");
  }
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem("token");
  // setUser(null); <-- Remove this unless you're calling a setter from context/hook
};

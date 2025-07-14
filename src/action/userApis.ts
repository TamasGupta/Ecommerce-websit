import axios from "axios";

// Get user profile
export const getUserProfile = async (token: any) => {
  const res = await axios.get("/api/user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return res.data;
};

// Update user profile
export const updateUserProfile = async (token: any, updatedUser: any) => {
  const res = await axios.put("/api/user/profile", updatedUser, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  });

  return res.data;
};

// Logout user
export const logoutUser = async () => {
  await fetch("/api/user/logout", {
    method: "POST",
    credentials: "include",
  });
};

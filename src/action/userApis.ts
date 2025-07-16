import { apiWithToken } from "../helper/helper";

// ✅ Get user profile
export const getUserProfile = async () => {
  try {
    const res = await apiWithToken("get", "api/users/profile");
    return res;
  } catch (error: any) {
    console.error("Failed to fetch user profile:", error.message || error);
    throw new Error(error?.message || "Error fetching user profile");
  }
};

// ✅ Update user profile (should be PUT not POST)
export const updateUserProfile = async (updatedUser: any) => {
  try {
    const res = await apiWithToken("put", "api/users/profile", updatedUser);
    return res;
  } catch (error: any) {
    console.error("Failed to update user profile:", error.message || error);
    throw new Error(error?.message || "Error updating user profile");
  }
};

// ✅ Logout user
export const logoutUser = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/users/logout", {
      method: "POST",
      credentials: "include",
    });

    if (!res.ok) {
      const errorBody = await res.json();
      throw new Error(errorBody.message || "Logout failed");
    }
  } catch (error: any) {
    console.error("Logout error:", error.message || error);
    throw new Error(error?.message || "Error logging out");
  }
};

import API from "./axiosInstance"; // assuming your API instance is exported from here

export const apiWithToken = async (
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data?: any
) => {
  const token = localStorage.getItem("token");

  try {
    const response = await API.request({
      method,
      url,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};
export const apiWithoutToken = async (
  method: "get" | "post" | "put" | "delete" | "patch",
  url: string,
  data?: any
) => {
  try {
    const response = await API.request({
      method,
      url,
      data,
    });
    return response;
  } catch (error: any) {
    throw error?.response?.data || error;
  }
};

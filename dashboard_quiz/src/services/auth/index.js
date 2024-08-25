import axios from "axios";
import { baseURL } from "../../config";
import Cookies from "universal-cookie";
import axiosInstance from "../../utils/axiosInstance";
const cookies = new Cookies();

export const login = async (data) => {
  // console.log({ data });
  const response = await axios
    .post(`${baseURL}/auth/login`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      const errorResponse = error?.response?.data || {};
      console.log({ errorResponse });
      throw new Error(JSON.stringify(errorResponse));
    });

  if (response?.data?.success) {
    let { user, token } = response.data.data;

    cookies.set("cpd_userId", user?._id, { path: "/" });
    cookies.set("cpd_userEmail", user?.email, { path: "/" });
    cookies.set("cpd_userRole", user?.role, { path: "/" });
    cookies.set("cpd_userName", user?.userName, { path: "/" });
    cookies.set("cpd_accessToken", token?.accessToken, { path: "/" });
    cookies.set("cpd_refreshToken", token?.refreshToken, { path: "/" });

    return response.data.data;
  }
  throw new Error("Something went wrong");
};

export const registerFn = async (data) => {
  const response = await axios
    .post(`${baseURL}/auth/create`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      throw new Error(error);
    });

  console.log({ response });
  return response.data;
};

export const logout = async () => {
  try {
    cookies.remove("cpd_userId", { path: "/" });
    cookies.remove("cpd_userEmail", { path: "/" });
    cookies.remove("cpd_userRole", { path: "/" });
    cookies.remove("cpd_userName", { path: "/" });
    cookies.remove("cpd_accessToken", { path: "/" });
    cookies.remove("cpd_refreshToken", { path: "/" });
  } catch (error) {
    throw new Error(error.response);
  }
};

export const updatePassword = async ({ password }) => {
  try {
    console.log({ password });

    const response = await axiosInstance
      .patch(`/auth/change-password`, { password })
      .catch((error) => {
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });

    console.log({ response });

    return response.data.data;
  } catch (error) {
    console.log({ error });
    throw new Error(error);
  }
};

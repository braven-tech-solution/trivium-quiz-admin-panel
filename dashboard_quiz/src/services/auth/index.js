import axios from "axios";
import { baseURL } from "../../config";
import Cookies from "universal-cookie";
import axiosInstance from "../../utils/axiosInstance";
const cookies = new Cookies();

export const login = async (data) => {
  // console.log({ data });
  const response = await axios
    .post(`${baseURL}/users/login`, data, {
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
    let data = response.data?.data;

    // console.log(data);
    cookies.set("quiz_userId", data?._id, { path: "/" });
    cookies.set("quiz_userEmail", data?.email, { path: "/" });
    cookies.set("quiz_userRole", data?.role, { path: "/" });
    cookies.set("quiz_userName", data?.userName, { path: "/" });
    cookies.set("quiz_accessToken", data?.accessToken, { path: "/" });
    cookies.set("quiz_refreshToken", data?.refreshToken, { path: "/" });

    return data;
  }
  throw new Error("Something went wrong");
};

export const registerFn = async (data) => {
  const response = await axios
    .post(`${baseURL}/users/create`, data, {
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
    cookies.remove("quiz_userId", { path: "/" });
    cookies.remove("quiz_userEmail", { path: "/" });
    cookies.remove("quiz_userRole", { path: "/" });
    cookies.remove("quiz_userName", { path: "/" });
    cookies.remove("quiz_accessToken", { path: "/" });
    cookies.remove("quiz_refreshToken", { path: "/" });
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

    return response.data?.data;
  } catch (error) {
    console.log({ error });
    throw new Error(error);
  }
};

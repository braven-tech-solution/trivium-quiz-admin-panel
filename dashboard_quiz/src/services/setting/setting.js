import { baseURL } from "../../config";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

export const getSetting = async () => {
  try {
    const response = await axios.get(`${baseURL}/setting`).catch((error) => {
      const errorResponse = error?.response?.data || {};

      throw new Error(JSON.stringify(errorResponse));
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateSetting = async ({ payload }) => {
  try {
    const response = await axiosInstance
      .patch(`/setting`, payload)
      .catch((error) => {
        console.log(error);
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });

    return response.data?.data;
  } catch (error) {
    throw new Error(error);
  }
};

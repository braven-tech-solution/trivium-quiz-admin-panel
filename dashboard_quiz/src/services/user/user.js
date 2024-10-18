import { baseURL } from "../../config";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

export const getUserStatistic = async (year) => {
  // console.log({ year });
  try {
    const response = await axios
      .get(`${baseURL}/users/statistics?year=${year}`)
      .catch((error) => {
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getTotalUser = async () => {
  // console.log({ year });
  try {
    const response = await axios
      .get(`${baseURL}/users/total-user`)
      .catch((error) => {
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

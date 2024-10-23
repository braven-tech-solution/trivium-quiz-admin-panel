import { baseURL } from "../../config";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

export const addLive = async ({ formData }) => {
  try {
    const response = await axios
      .post(`${baseURL}/live/`, formData)
      .catch((error) => {
        console.log(error);
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });

    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllLiveQuiz = async () => {
  try {
    const response = await axios.get(`${baseURL}/live`).catch((error) => {
      const errorResponse = error?.response?.data || {};

      throw new Error(JSON.stringify(errorResponse));
    });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const totalLiveQuiz = async () => {
  try {
    const response = await axios
      .get(`${baseURL}/schedule/total-schedule-quiz`)
      .catch((error) => {
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

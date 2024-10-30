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
    const response = await axiosInstance.get(`/live`).catch((error) => {
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
      .get(`${baseURL}/live/total-schedule-quiz`)
      .catch((error) => {
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });

    console.log(response);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateLiveQuiz = async ({ id, formData }) => {
  try {
    const response = await axios
      .patch(`${baseURL}/live/${id}`, formData)
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

export const deleteLiveQuiz = async ({ id }) => {
  try {
    console.log(id);

    const response = await axiosInstance
      .delete(`/live/${id}`)
      .catch((error) => {
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });

    console.log({ response });

    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
};

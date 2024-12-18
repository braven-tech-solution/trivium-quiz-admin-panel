import { baseURL } from "../../config";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

export const addQuestion = async ({ payload }) => {
  try {
    const response = await axios
      .post(`${baseURL}/question/`, payload)
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

export const getAllQuestion = async () => {
  try {
    const response = await axiosInstance
      .get(`/question/level`)
      .catch((error) => {
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });
    // console.log("resonse");
    // console.log(response);

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllLiveQuestion = async () => {
  try {
    const response = await axiosInstance
      .get(`/question/live`)
      .catch((error) => {
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });
    // console.log("resonse");
    // console.log(response);

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const questionCount = async () => {
  try {
    const response = await axios
      .get(`${baseURL}/question/count`)
      .catch((error) => {
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });
    // console.log("resonse");
    // console.log(response);

    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateQuestion = async ({ id, data }) => {
  try {
    console.log(id, data);
    const response = await axiosInstance
      .patch(`/question/${id}`, data)
      .catch((error) => {
        console.log(error);
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });

    return response?.data?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteQuestion = async ({ id }) => {
  try {
    console.log({ id });

    const response = await axiosInstance
      .delete(`/question/${id}`)
      .catch((error) => {
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });

    console.log({ response });

    return response.data?.data;
  } catch (error) {
    throw new Error(error);
  }
};

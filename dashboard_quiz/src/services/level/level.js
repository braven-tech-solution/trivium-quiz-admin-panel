import { baseURL } from "../../config";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

export const addLevel = async ({ formData }) => {
  try {
    const response = await axios
      .post(`${baseURL}/level/`, formData)
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

export const getAllCategory = async () => {
  try {
    const response = await axios.get(`${baseURL}/category/`).catch((error) => {
      const errorResponse = error?.response?.data || {};

      throw new Error(JSON.stringify(errorResponse));
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateCategory = async ({ id, formData }) => {
  try {
    const response = await axios
      .patch(`${baseURL}/category/${id}`, formData)
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

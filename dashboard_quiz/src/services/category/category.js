import { baseURL } from "../../config";
import axiosInstance from "../../utils/axiosInstance";
import axios from "axios";

export const createNewCategory = async ({ formData }) => {
  try {
    const response = await axios
      .post(`${baseURL}/category/add/`, formData)
      .catch((error) => {
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
    const response = await axios
      .get(`${baseURL}/category/all`)
      .catch((error) => {
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

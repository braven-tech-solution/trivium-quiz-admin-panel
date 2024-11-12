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

    return response.data?.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllLevelByCategoryId = async (categoryId) => {
  if (!categoryId) {
    return null;
  }
  // console.log({ categoryId });

  try {
    const response = await axios
      .get(`${baseURL}/level/${categoryId}`)
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

export const getAllLevel = async () => {
  try {
    const response = await axios.get(`${baseURL}/level`).catch((error) => {
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

export const updateLevel = async ({ id, formData }) => {
  try {
    const response = await axios
      .patch(`${baseURL}/level/${id}`, formData)
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

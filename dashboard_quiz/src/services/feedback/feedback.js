import axiosInstance from "../../utils/axiosInstance";

export const getAllFeedback = async () => {
  try {
    const response = await axiosInstance.get(`/feedback/all`).catch((error) => {
      const errorResponse = error?.response?.data || {};

      throw new Error(JSON.stringify(errorResponse));
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

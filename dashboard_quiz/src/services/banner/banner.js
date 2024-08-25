import axiosInstance from "../../utils/axiosInstance";

export const createNewBanner = async ({ formData }) => {
  try {
    const response = await axiosInstance
      .post(`/banner/create/`, formData)
      .catch((error) => {
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });

    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllBanner = async () => {
  try {
    const response = await axiosInstance
      .get(`/banner/allBanner`)
      .catch((error) => {
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateBanner = async ({ id, updateData }) => {
  try {
    console.log({ id, updateData });

    const response = await axiosInstance
      .patch(`/banner/update/${id}`, updateData)
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

export const deleteBanner = async ({ id }) => {
  try {
    console.log(id);

    const response = await axiosInstance
      .delete(`/banner/delete/${id}`)
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

import axiosInstance from "../../utils/axiosInstance";

export const createNewFood = async ({ formData }) => {
  try {
    const response = await axiosInstance
      .post(`/food/create/`, formData)
      .catch((error) => {
        const errorResponse = error?.response?.data || {};

        throw new Error(JSON.stringify(errorResponse));
      });

    return response.data.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const getAllFood = async () => {
  try {
    const response = await axiosInstance.get(`/food/allFood`).catch((error) => {
      const errorResponse = error?.response?.data || {};

      throw new Error(JSON.stringify(errorResponse));
    });

    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const updateFood = async ({ id, updateData }) => {
  try {
    console.log({ id, updateData });

    const response = await axiosInstance
      .patch(`/food/update/${id}`, updateData)
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

export const deleteFood = async ({ id }) => {
  try {
    console.log(id);

    const response = await axiosInstance
      .delete(`/food/delete/${id}`)
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

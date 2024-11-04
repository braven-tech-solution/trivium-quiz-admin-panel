import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../services/category/category";
import { useEffect, useState } from "react";
import { imageBaseURL } from "../config";
import { toast } from "react-toastify";

const useCategory = () => {
  const [allCategoryData, setAllCategoryData] = useState([]);
  const { data: { data: { data: categoryData } } = { data: { data: null } } } =
    useQuery({
      queryKey: ["allCategory"],
      queryFn: getAllCategory,
    });

  const queryClient = useQueryClient();

  const categoryUpdateMutation = useMutation({
    mutationFn: updateCategory,
  });

  const categoryDeleteMutation = useMutation({
    mutationFn: deleteCategory,
  });

  useEffect(() => {
    // console.log({ bandata: categoryData });
    // console.log(imageBaseURL);
    if (categoryData?.length > 0) {
      const tempData = categoryData?.map((item, index) => {
        return {
          id: item._id,
          image: `${imageBaseURL}${item?.image}`,
          priority: item?.priority,
          name: item?.name,
          perQuestionMark: item?.perQuestionMark,
          negativeAnswerMark: item?.negativeAnswerMark,
          status: item?.status === "Deactive" ? "Deactive" : "Active",
        };
      });
      setAllCategoryData(tempData);
    } else {
      setAllCategoryData([]);
    }
  }, [categoryData]);

  const handleUpdateCategory = async (id, formData) => {
    console.log(formData);
    console.log(id);

    categoryUpdateMutation.mutate(
      {
        id,
        formData,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["allCategory"]);
          toast.success("Category update successfully");
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  const handleDeleteCategory = async (data) => {
    console.log(data);
    categoryDeleteMutation.mutate(
      {
        id: data.id,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["allCategory"]);
          toast.success("Delete successfully");
        },
        onError: (err) => {},
      }
    );
  };

  return { allCategoryData, handleUpdateCategory, handleDeleteCategory };
};

export default useCategory;

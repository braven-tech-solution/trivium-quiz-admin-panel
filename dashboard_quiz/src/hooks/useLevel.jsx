import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../services/category/category";
import { useEffect, useState } from "react";
import { imageBaseURL } from "../config";
import { toast } from "react-toastify";
import { getAllLevelByCategoryId, updateLevel } from "../services/level/level";

const useLevel = (slectCategory) => {
  console.log({ slectCategory });
  const [allLevelData, setAllLevelData] = useState([]);
  const { data: levelData } = useQuery({
    queryKey: ["levelData", slectCategory],
    queryFn: () => getAllLevelByCategoryId(slectCategory),
  });

  const queryClient = useQueryClient();

  const updateLevelMutation = useMutation({
    mutationFn: updateLevel,
  });

  const categoryDeleteMutation = useMutation({
    mutationFn: deleteCategory,
  });

  const handleUpdateLevel = async (id, formData) => {
    console.log(formData);
    console.log(id);

    updateLevelMutation.mutate(
      {
        id,
        formData,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["levelData"]);
          toast.success("Level Data  update successfully");
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

  return { levelData, handleUpdateLevel, handleDeleteCategory };
};

export default useLevel;

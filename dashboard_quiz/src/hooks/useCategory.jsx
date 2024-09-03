import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../services/category/category";
import { useEffect, useState } from "react";

const useCategory = () => {
  const [allCategoryData, setAllCategoryData] = useState([]);
  const { data: { data: { data: categoryData } } = { data: { data: null } } } =
    useQuery({
      queryKey: ["allCategory"],
      queryFn: getAllCategory,
    });

  useEffect(() => {
    if (categoryData?.length > 0) {
      const tempData = categoryData?.map((item, index) => {
        return {
          id: item._id,
          name: item?.name,
        };
      });
      setAllCategoryData(tempData);
    } else {
      setAllCategoryData([]);
    }
  }, [categoryData]);

  return { allCategoryData };
};

export default useCategory;

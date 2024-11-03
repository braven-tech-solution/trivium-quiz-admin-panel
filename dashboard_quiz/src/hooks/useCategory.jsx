import { useQuery } from "@tanstack/react-query";
import { getAllCategory } from "../services/category/category";
import { useEffect, useState } from "react";
import { imageBaseURL } from "../config";

const useCategory = () => {
  const [allCategoryData, setAllCategoryData] = useState([]);
  const { data: { data: { data: categoryData } } = { data: { data: null } } } =
    useQuery({
      queryKey: ["allCategory"],
      queryFn: getAllCategory,
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

  return { allCategoryData };
};

export default useCategory;

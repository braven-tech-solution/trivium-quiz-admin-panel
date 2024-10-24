import { useQuery } from "@tanstack/react-query";
import { getAllQuestion } from "../services/question/question";

export const useAllQuestion = () => {
  const {
    data: { data: { data: allQuestionData } } = { data: { data: null } },
  } = useQuery({
    queryKey: ["allQuestionData"],
    queryFn: getAllQuestion,
  });
  return { allQuestionData: allQuestionData || [] };
};

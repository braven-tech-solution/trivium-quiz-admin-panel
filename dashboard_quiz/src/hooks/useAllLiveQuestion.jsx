import { useQuery } from "@tanstack/react-query";
import { getAllLiveQuiz } from "../services/liveQuiz/liveQuiz";
import {
  getAllLiveQuestion,
  getAllQuestion,
} from "../services/question/question";

export const useAllLiveQuestion = () => {
  const {
    data: { data: { data: allQuestionData } } = { data: { data: null } },
  } = useQuery({
    queryKey: ["allLiveQuestionData"],
    queryFn: getAllLiveQuestion,
  });
  return { allLiveQuestionData: allQuestionData || [] };
};

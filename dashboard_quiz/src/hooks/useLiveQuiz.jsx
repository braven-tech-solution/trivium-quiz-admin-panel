import { useQuery } from "@tanstack/react-query";
import { getAllLiveQuiz } from "../services/liveQuiz/liveQuiz";

export const useLiveQuiz = () => {
  const { data: liveQuiz } = useQuery({
    queryKey: ["allLiveQuiz"],
    queryFn: getAllLiveQuiz,
  });

  return { liveQuiz: liveQuiz || [] };
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllLiveQuiz } from "../services/liveQuiz/liveQuiz";
import {
  deleteQuestion,
  getAllLiveQuestion,
} from "../services/question/question";

export const useAllLiveQuestion = () => {
  const queryClient = useQueryClient();

  const {
    data: { data: { data: allQuestionData } } = { data: { data: null } },
  } = useQuery({
    queryKey: ["allLiveQuestionData"],
    queryFn: getAllLiveQuestion,
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: deleteQuestion,
  });

  const questionDelete = async (data) => {
    console.log(data);
    deleteQuestionMutation.mutate(
      {
        id: data._id,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["allLiveQuestionData"]);
          toast.success("Delete successfully");
        },
        onError: (err) => {},
      }
    );
  };
  return { allLiveQuestionData: allQuestionData || [], questionDelete };
};

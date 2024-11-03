import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllLiveQuiz } from "../services/liveQuiz/liveQuiz";
import {
  deleteQuestion,
  getAllLiveQuestion,
  updateQuestion,
} from "../services/question/question";
import { toast } from "react-toastify";

export const useAllLiveQuestion = () => {
  const queryClient = useQueryClient();

  const {
    data: { data: { data: allQuestionData } } = { data: { data: null } },
  } = useQuery({
    queryKey: ["allLiveQuestionData"],
    queryFn: getAllLiveQuestion,
  });

  const updateQuestionMutation = useMutation({
    mutationFn: updateQuestion,
  });

  const deleteQuestionMutation = useMutation({
    mutationFn: deleteQuestion,
  });

  const questionUpdate = async (id, data) => {
    console.log(id, data);

    updateQuestionMutation.mutate(
      {
        id,
        data,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["allLiveQuestionData"]);
          toast.success("Question update successfully");
          setModal(false);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

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
  return {
    allLiveQuestionData: allQuestionData || [],
    questionDelete,
    questionUpdate,
  };
};

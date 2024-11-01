import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteQuestion, getAllQuestion } from "../services/question/question";

export const useAllQuestion = () => {
  const queryClient = useQueryClient();

  const {
    data: { data: { data: allQuestionData } } = { data: { data: null } },
  } = useQuery({
    queryKey: ["allQuestionData"],
    queryFn: getAllQuestion,
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
          queryClient.invalidateQueries(["allQuestionData"]);
          toast.success("Delete successfully");
        },
        onError: (err) => {},
      }
    );
  };

  return { allQuestionData: allQuestionData || [], questionDelete };
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteLiveQuiz, getAllLiveQuiz } from "../services/liveQuiz/liveQuiz";
import { toast } from "react-toastify";

export const useLiveQuiz = () => {
  const queryClient = useQueryClient();

  const { data: liveQuiz } = useQuery({
    queryKey: ["allLiveQuiz"],
    queryFn: getAllLiveQuiz,
  });

  const deleteLiveQuizMutation = useMutation({
    mutationFn: deleteLiveQuiz,
  });

  const liveQuizDelete = async (data) => {
    // console.log(data);
    deleteLiveQuizMutation.mutate(
      {
        id: data._id,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["allLiveQuiz"]);
          toast.success("Delete successfully");
        },
        onError: (err) => {},
      }
    );
  };

  return { liveQuiz: liveQuiz || [], liveQuizDelete };
};

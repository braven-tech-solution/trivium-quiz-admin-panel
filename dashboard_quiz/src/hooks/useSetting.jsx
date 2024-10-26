import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSetting, updateSetting } from "../services/setting/setting";
import { toast } from "react-toastify";

const useSetting = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["setting"],
    queryFn: getSetting,
  });

  const settingUpdateMutation = useMutation({
    mutationFn: updateSetting,
  });

  const settingUpdate = async (data) => {
    // console.log(data);
    settingUpdateMutation.mutate(
      {
        payload: data,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["setting"]);
          toast.success("setting update successfully");
          setModal(false);
        },
        onError: (err) => {
          console.log(err);
        },
      }
    );
  };

  return { ...data?.data, settingUpdate };
};

export default useSetting;

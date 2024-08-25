import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/profile";
import { baseURL } from "../config";
import { useEffect } from "react";

export const useAvatar = (userId) => {
  const { data } = useQuery({
    queryKey: ["profileAvatar", userId],
    queryFn: async () => getProfile(userId),
  });

  const avatar = data?.data?.avatar ? (
    <img
      src={`${baseURL}/uploads/avatar/${data?.data?.avatar}`}
      alt=""
      className="w-full rounded-full"
    />
  ) : (
    <span>{data?.data?.firstName?.[0]}</span>
  );

  return { avatar };
};

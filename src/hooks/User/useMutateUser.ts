import { Data, UserRegister } from "@/@types/app";
import { QueryKeys } from "@/setup/QueryKeys";
import api from "@/setup/api";
import { QueryKeys } from "@/setup/QueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type PostData = {
  email: string;
  password: string;
};

const postData = async (postData: PostData) => {
  const response = await api.post(`/login`, postData);

  return response.data;
};

export function useMutateUser() {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation<Data, unknown, PostData>({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserData] });
    },
  });

  return {
    mutate: async (data: PostData): Promise<Data> => {
      const result = await mutateAsync(data);

      return result;
    },
  };
}

export const useMutateRegisterUser = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation<Data, unknown, UserRegister>({
    mutationFn: postRegister,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.UserData] });
    },
  });

  return {
    mutate: async (data: UserRegister): Promise<Data> => {
      const result = await mutateAsync(data);
      console.log(result);
      return result;
    },
  };
};

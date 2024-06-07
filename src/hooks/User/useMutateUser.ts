import { Data, UserRegister } from "@/@types/app";
import api from "@/setup/api";
import { QueryKeys } from "@/setup/QueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type PostData = {
  email: string;
  password: string;
};

const postData = async (postData: PostData) => {
  const response = await api.post(`/login`, postData);

  console.log(response.data);

  return response.data;
};

const postRegister = async (data: UserRegister) => {
  const response = await api.post("/donators", data);
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
      console.log(result);
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

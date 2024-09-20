import { Data, User, UserRegister } from "@/@types/app";
import api, { authedApi } from "@/setup/api";
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

const postRegister = async (data: UserRegister) => {
  const response = await api.post("/donators", data);
  return response.data;
};

const postEditUser = async (data: Omit<User, "id">) => {
  const response = await authedApi.put(`/donator`, data);
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
      return result;
    },
  };
};


export const useMutateEditUser = () => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation<
    Omit<Data, "token" | "expiration_date">,
    unknown,
    Omit<User, "id">
  >({
    mutationFn: postEditUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.EditUser] });
    },
  });

  return {
    mutate: async (
      data: Omit<User, "id">
    ): Promise<Omit<Data, "token" | "expiration_date">> => {
      const result = await mutateAsync(data);
      return result;
    },
  };
}
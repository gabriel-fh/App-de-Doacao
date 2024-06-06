import { Data } from "@/@types/app";
import api from "@/setup/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type PostData = {
  email: string;
  password: string;
};

const postData = async (postData: PostData) => {
console.log(postData);


  const response = await api.post(`/login`, postData);

  console.log(response.data)

  return response.data;
};

export function useMutateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation<Data, unknown, PostData>({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  return {
    mutate: async (data: PostData): Promise<Data> => {
      const result = await mutateAsync(data);
      console.log(result)
      return result;
    },
  };
}

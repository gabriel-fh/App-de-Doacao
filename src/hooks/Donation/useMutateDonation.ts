import { authedApi } from "@/setup/api";
import { QueryKeys } from "@/setup/QueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type PostData = {
  campaign_id: 1;
  donation_time: string;
  items: [
    {
      id: number;
      quantity: number;
    }
  ];
};

const postData = async (postData: PostData) => {
  const response = await authedApi.post(`/donations`, postData);

  return response.data;
};


// export function useMutateUser() {
//     const queryClient = useQueryClient();
//     const { mutateAsync } = useMutation<Data, unknown, PostData>({
//       mutationFn: postData,
//       onSuccess: () => {
//         queryClient.invalidateQueries({ queryKey: [QueryKeys.UserData] });
//       },
//     });
  
//     return {
//       mutate: async (data: PostData): Promise<Data> => {
//         const result = await mutateAsync(data);
//         console.log(result);
//         return result;
//       },
//     };
//   }
  
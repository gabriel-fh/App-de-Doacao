import { authedApi } from "@/setup/api";
import { QueryKeys } from "@/setup/QueryKeys";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type PostData = {
  campaign_id: number;
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


export function useMutateDonation() {
    const queryClient = useQueryClient();
    const { mutateAsync } = useMutation<void, unknown, PostData>({
      mutationFn: postData,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QueryKeys.UserDonations] });
      },
    });
  
    return {
      mutate: async (data: PostData): Promise<void> => {
        await mutateAsync(data);
        return;
      },
    };
  }
  
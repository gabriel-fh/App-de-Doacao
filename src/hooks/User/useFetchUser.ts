import { User } from "@/@types/app";
import { QueryKeys } from "@/setup/QueryKeys";
import { authedApi } from "@/setup/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const fetchData = async (): Promise<User> => {
  const storagedData = await AsyncStorage.getItem("@app-doacao:AuthToken");

  if (!storagedData) {
    return null;
  }

  const response = await authedApi.get(`/donator`);

  return response.data;
};

export function useFetchUser() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryFn: fetchData,
    queryKey: [QueryKeys.UserData],
    retry: 3,
    staleTime: 1000 * 60 * 5,
    refetchInterval: 1000 * 30,
    refetchOnMount: true,
  });

  const invalidateRefresh = () => {
    query.refetch();
  };

  return { ...query, invalidateRefresh };
}

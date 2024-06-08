import { Donation } from "@/@types/app";
import { authedApi } from "@/setup/api";
import { QueryKeys } from "@/setup/QueryKeys";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";

const fetchData = async (): Promise<Donation[]> => {
  const storagedData = await AsyncStorage.getItem("@app-doacao:AuthToken");

  if (!storagedData) {
    return null;
  }

  const response = await authedApi.get(`/donations`);

  return response.data.data;
};

export function useFetchDonation() {
  const query = useQuery({
    queryFn: fetchData,
    queryKey: [QueryKeys.UserDonations],
    retry: 3,
    staleTime: 1000 * 60 * 10,
    refetchInterval: 1000 * 60 * 2,
  });

  return query;
}

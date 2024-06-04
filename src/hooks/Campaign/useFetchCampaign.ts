/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "@/setup/QueryKeys";
import { Campaign } from "@/@types/app";

const fetchData = async (): Promise<Campaign[]> => {

    const response = await api.get(`/campaigns`);
    
    return response.data.data;
};

export function useFetchCampaign() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: [QueryKeys.Campaigns],
        retry: 3,
        staleTime: 1000 * 60 * 10,
        refetchInterval: 1000 * 60 * 2,
    });

    return query
}
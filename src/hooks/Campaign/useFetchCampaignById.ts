/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "@/setup/QueryKeys";
import { CampaignById } from "@/@types/app";


interface FetchDataQueryKey {
    campaignId: string,
}

const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<CampaignById> => {
    const [_, { campaignId }] = queryKey;

    const response = await api.get(`/campaign/${Number(campaignId)}`);

    return response.data.data;
};

export function useFetchCampaignById(campaignId: string) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: [QueryKeys.CampaignById, { campaignId }],
        retry: 3,
        enabled: !!campaignId,
    });

    return query
}
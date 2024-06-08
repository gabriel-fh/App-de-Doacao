/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "@/setup/QueryKeys";
import { Campaign, Item } from "@/@types/app";

interface FetchDataQueryKey {
    search: string,
    items: Item[]
}

const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<Campaign[]> => {
    const [_, { search, items }] = queryKey;

    const response = await api.get(`/campaigns`, { params: { name: search, item: items[0]?.id ?? null } });

    return response.data.data;
};

export function useSearchCampaign(search: string, items: Item[]) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: [QueryKeys.SearchCampaigns, { search, items }],
        retry: 3,
        staleTime: 1000 * 60 * 10,
        refetchInterval: 1000 * 60 * 2,
    });

    return query
}
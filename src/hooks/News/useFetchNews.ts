/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "@/setup/QueryKeys";
import { News } from "@/@types/app";

const fetchData = async (): Promise<News[]> => {

    const response = await api.get(`/news`);

    return response.data.data;
};

export function useFetchNews() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: [QueryKeys.News],
        retry: 3,
        staleTime: 1000 * 60 * 10,
        refetchInterval: 1000 * 60 * 2,
    });

    return query
}
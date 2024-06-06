/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "@/setup/QueryKeys";
import { News } from "@/@types/app";


interface FetchDataQueryKey {
    newsId: string,
}

const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<News> => {
    const [_, { newsId }] = queryKey;

    const response = await api.get(`/news/${Number(newsId)}`);

    return response.data.data;
};

export function useFetchNewsById(newsId: string) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: [QueryKeys.NewsById, { newsId }],
        retry: 3,
        enabled: !!newsId,
    });

    return query
}
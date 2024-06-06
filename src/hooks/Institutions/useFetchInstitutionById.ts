/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "@/setup/QueryKeys";
import { InstitutionById } from "@/@types/app";


interface FetchDataQueryKey {
    institutionId: string,
}

const fetchData = async ({ queryKey }: QueryFunctionContext<[string, FetchDataQueryKey]>): Promise<InstitutionById> => {
    const [_, { institutionId }] = queryKey;

    const response = await api.get(`/institution/${Number(institutionId)}`);

    return response.data.data;
};

export function useFetchInstitutionById(institutionId: string) {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: [QueryKeys.InstitutionById, { institutionId }],
        retry: 3,
        enabled: !!institutionId,
    });

    return query
}
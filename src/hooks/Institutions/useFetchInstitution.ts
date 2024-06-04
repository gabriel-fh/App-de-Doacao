/* eslint-disable @typescript-eslint/no-unused-vars */
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "@/setup/QueryKeys";
import { Institution } from "@/@types/app";

const fetchData = async (): Promise<Institution[]> => {

    const response = await api.get(`/institutions`);
    
    return response.data.data;
};

export function useFetchInstitutions() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: [QueryKeys.Institutions],
        retry: 3,
        staleTime: 1000 * 60 * 10,
        refetchInterval: 1000 * 60 * 2,
    });

    return query
}
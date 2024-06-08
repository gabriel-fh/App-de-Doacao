/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import api from "../../setup/api";
import { QueryKeys } from "@/setup/QueryKeys";
import { Item } from "@/@types/app";


const fetchData = async (): Promise<Item[]> => {
    const response = await api.get(`/items`);

    return response.data.data;
};

export function useFetchItems() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: [QueryKeys.Items],
        retry: 3,
    });

    return query
}
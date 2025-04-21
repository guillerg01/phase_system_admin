import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { LocationItem } from "../interfaces/interfaces";
import LocationsServices from "../services/DriverApiServices";

export const useGetLocationByID = (id: string) => {
    const KEY = 'Locations';
    const fetchPractices = async () => {
        return await LocationsServices.getById(id)
    }

    const { data, isLoading }: UseQueryResult<AxiosResponse<LocationItem, any>, Error> = useQuery({
        queryKey: [ KEY, id ],
        queryFn: () => fetchPractices(),
        enabled: id ? true : false

    })

    return { locationItem: data?.data || undefined, isLoading }
};


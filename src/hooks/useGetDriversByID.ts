import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosResponse } from "axios";


import { Driver } from "@/interfaces/interfaces";
import DriverApiServices from "@/services/DriverApiServices";

export const useGetLocationByID = (id: string) => {
    const KEY = 'Driver';
    const fetchPractices = async () => {
        return await DriverApiServices.getById(id)
    }

    const { data, isLoading }: UseQueryResult<AxiosResponse<Driver, any>, Error> = useQuery({
        queryKey: [ KEY, id ],
        queryFn: () => fetchPractices(),
        enabled: id ? true : false

    })

    return { DriversData: data?.data || undefined, isLoading };
};


import { useQuery } from "@tanstack/react-query";
import DriversServices from "../services/DriversServices";
import { Dispatch, SetStateAction } from "react";

export const useGetDrivers = (
  setPageNumber?: Dispatch<SetStateAction<number>>,
  pageNumber?: number,

  elementsPerPage?: number,
  search?: string,
  hasFavorites?: boolean
) => {
  const KEY = "Drivers";

  const removeEmptyProperties = (params: object) => {
    const cleanedParams = Object.entries(params).reduce(
      (a, [k, v]) => (v === "" ? a : { ...a, [k]: v }),
      {}
    );

    return cleanedParams;
  };

  const fetchData = async (
    pageNo: number,
    pageSize: number,
    search: string
  ) => {
    const paramsData: any = removeEmptyProperties({
      search,
      filter: hasFavorites
        ? {
            hasFavorites: true,
          }
        : {},
      pageSize: pageSize ? pageSize : "",
      pageNo: pageNo ? pageNo : "",
    });

    return await DriversServices.get(paramsData);
  };

  const fetchDrivers = async () => {
    return await fetchData(
      (pageNumber = 1),
      elementsPerPage ?? 15,
      search || ""
    );
  };

  const { data, isLoading } = useQuery({
    queryKey: [KEY, search, pageNumber, hasFavorites],
    queryFn: () => fetchDrivers(),
  });

  const nextPage = () => {
    if (
      data?.data?.totalPages &&
      pageNumber &&
      pageNumber < data?.data?.totalPages
    ) {
      setPageNumber ? setPageNumber(pageNumber + 1) : null;
    }
  };

  const prevPage = () => {
    if (data?.data?.totalPages && pageNumber && pageNumber > 1) {
      setPageNumber ? setPageNumber(pageNumber - 1) : null;
    }
  };

  const goToPage = (page: number) => {
    if (data?.data?.totalPages && page >= 1 && page <= data?.data?.totalPages) {
      setPageNumber ? setPageNumber(page) : null;
    }
  };

  return {
    nextPage,
    prevPage,
    totalElements: data?.data?.totalElements,
    DriversData: data?.data?.data || [],
    totalPages: data?.data?.totalPages,
    isLoading,
  };
};

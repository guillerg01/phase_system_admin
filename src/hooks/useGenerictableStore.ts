import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EntityApiService from "@/services/EntityApiService";
import { QueryParams } from "@/interfaces/interfaces";

export function useGenericTableStore({
  key = "Tables",
  countRows = 10,
  entity,
  fallbackData = [],
}: {
  key: string;
  countRows: number;
  entity: EntityApiService<any>;
  fallbackData?: any[];
}) {
  const [searchData, setSearchData] = useState<string>("");
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [sortByData, setSortByData] = useState<string>("");
  const [pageLimit, setLimit] = useState<number>(countRows);
  const [params, setParams] = useState<any>();
  const api = entity || EntityApiService;

  const removeEmptyProperties = (params: object) => {
    return Object.entries(params).reduce(
      (a, [k, v]) => (v === "" ? a : { ...a, [k]: v }),
      {}
    );
  };

  const fetchData = async (
    pageNo: number,
    pageSize: number,
    search: string,
    sortBy: string,
    paramsA: any
  ) => {
    const paramsData: QueryParams | {} = removeEmptyProperties({
      filter: { ...paramsA },
      search,
      sortBy,
      pageSize,
      pageNo,
    });

    return await api.get(paramsData as QueryParams);
  };

  const { isLoading, isError, data, isFetching, refetch, error } = useQuery({
    queryKey: [key, pageLimit, pageNumber, sortByData, searchData, params],
    queryFn: () =>
      fetchData(pageNumber, pageLimit, searchData, sortByData, params),
    enabled: true,
  });

  const nextPage = () => {
    if (data?.data?.totalPages && pageNumber < data?.data?.totalPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const prevPage = () => {
    if (data?.data?.totalPages && pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToPage = (page: number) => {
    if (data?.data?.totalPages && page > 0 && page <= data?.data?.totalPages) {
      setPageNumber(page);
    }
  };

  // Return fallbackData if there's an error reading response status
  const isStatusError = error?.message?.includes(
    "Cannot read properties of undefined (reading 'status')"
  );
  const tableData = isStatusError ? fallbackData : data?.data?.data || [];

  return {
    isLoading,
    isError,
    data: tableData,
    totalElements: data?.data?.totalElements,
    totalPages: data?.data?.totalPages,
    isFetching,
    refetch,
    setLimit,
    setParams,
    setPageNumber,
    setSortByData,
    setSearchData,
    nextPage,
    prevPage,
    goToPage,
    pageNumber,
  };
}

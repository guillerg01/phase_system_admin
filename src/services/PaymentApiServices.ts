import { AxiosRequestConfig, AxiosResponse } from "axios";
import EntityApiService from "./EntityApiService";
import { Driver, QueryParams } from "@/interfaces/interfaces";

class PaymentApiService extends EntityApiService<Driver> {
  get = async (params: QueryParams): Promise<AxiosResponse<any, any>> => {
    let filters = "";
    const isFilters =
      params?.filter && Object.entries(params?.filter).length > 0;
    if (isFilters) {
      filters = new URLSearchParams(params.filter).toString();
    }

    const { pageNo, pageSize, search, sortBy, sortType } = params;
    const basePath = `/all?page=${pageNo}&limit=${pageSize}`;
    return await this.getApiService()
      .getService()
      .get(
        this.getPath(
          `${basePath}${sortBy ? `&sortBy=${sortBy}` : ""}${
            sortType ? `&sortType=${sortType}` : ""
          }${isFilters ? "&" + filters : ""}${
            search ? `&search=${search}` : ""
          }`,
          params
        ),
        {}
      );
  };

  create = (params: Driver, config: AxiosRequestConfig = {}) => {
    return this.getApiService()
      .getService()
      .post(this.getPath("/register"), params, config);
  };

  export = (params: { startDate: string; endDate: string }, config: AxiosRequestConfig = {}) => {
    return this.getApiService()
      .getService()
      .post(this.getPath("/export"), params, config);
  };

  update = (id: string, params: Driver, config: AxiosRequestConfig = {}) => {
    return this.getApiService()
      .getService()
      .patch(this.getPath("/edit/" + id), params, config);
  };

  getById = (id: string, config: AxiosRequestConfig = {}) => {
    return this.getApiService()
      .getService()
      .get(this.getPath("/" + id), config);
  };
  delete = (id: string) => {
    return this.getApiService()
      .getService()
      .delete(this.getPath("/delete/" + id), {});
  };
}

export default new PaymentApiService("/payments");

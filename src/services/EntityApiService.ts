import _ from "lodash";

import {  AxiosRequestConfig, AxiosResponse } from "axios";
import ApiClientService from "./ApiClientService";
import { QueryParams } from "@/interfaces/interfaces";

class EntityApiService<T> {
  public readonly apiClient: ApiClientService;
  private readonly path: string;
  private readonly availableQueryParams: any;

  constructor(path: string) {
    this.path = path;
    this.availableQueryParams = [ "in18" ];
    this.apiClient = new ApiClientService();
  }

  getApiService = () => this.apiClient;

  getDefaultQueryParams(
    params: QueryParams = { pageNo: 1, pageSize: 10 },
    pickParams: any[] | null = null
  ) {
    const toParams = _.pick(
      params,
      pickParams ? pickParams : this.availableQueryParams
    );
    const queryParams = new URLSearchParams();
    _.forEach(toParams, function (value: any, key: any) {
      if (!_.isNil(value)) {
        queryParams.append(key, value);
      }
    });
    const stringQueryParams = queryParams.toString();
    return stringQueryParams && "?" + stringQueryParams;
  }

  getPath = (
    concat: string,
    params: QueryParams = { pageNo: 1, pageSize: 10 },
    pickParams: any[] | null = null
  ) => {
    return (
      this.path +
      (concat || "") +
      this.getDefaultQueryParams(params, pickParams)
    );
  };

  get = async (params: QueryParams): Promise<AxiosResponse<any, any>> => {
    const { pageNo, pageSize, filter, search, sortBy, sortType } = params;
    const basePath = `?pageNo=${pageNo}&pageSize=${pageSize}`;
    return await this.getApiService()
      .getService()
      .get(
        this.getPath(
          `${basePath}${filter ? `&filter=${filter}` : ""}${search ? `&search=${search}` : ""
          }${sortBy ? `&sortBy=${sortBy}` : ""}${sortType ? `&sortType=${sortType}` : ""
          }`,
          params
        ),
        {}
      );
  };

  getById = (id: string, config: AxiosRequestConfig = {}) => {
    return this.getApiService()
      .getService()
      .get(this.getPath("/" + id), config);
  };

  create = (
    params: T,
    config: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return this.getApiService().getService().post("", params, config);
  };

  update = (id: string, params: T, config: AxiosRequestConfig = {}) => {
    return this.getApiService()
      .getService()
      .patch(this.getPath("/" + id), params, config);
  };

  delete = (id: string, params?: QueryParams) => {
    return this.getApiService()
      .getService()
      .delete(this.getPath("/" + id, params), {});
  };

  custom = (id: string, params?: QueryParams) => {
    return this.getApiService()
      .getService()
      .delete(this.getPath("/" + id, params), {});
  };

  put = (params: QueryParams, config: AxiosRequestConfig = {}) => {
    return this.getApiService()
      .getService()
      .put(this.getPath(""), params, config);
  };
}

export default EntityApiService;

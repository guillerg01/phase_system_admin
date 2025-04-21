import axios, { AxiosInstance } from "axios";
import { Observable, Subject } from "rxjs";

import * as process from "process";
import { setCookie } from "cookies-next";

class ApiClientService {
  private static instance: ApiClientService;
  private readonly API_URL: string;
  // private readonly LANG_KEY: string;
  private readonly timeout: number | string;
  private readonly service: AxiosInstance;
  private defaultHeaders: object | undefined;
  private listener: Observable<object>;

  private static handleSuccess(response: any) {
    return response;
  }

  /**
   * The Singleton's constructor should always be private to prevent direct
   * construction calls with the `new` operator.
   */
  public constructor() {
    //this.API_URL = import.meta.env.VITE_PUBLIC_BACKEND_URL_MOCKED;
    this.API_URL = process.env.NEXT_PUBLIC_API_URL!;
    this.timeout = 1000000;
    this.service = axios.create({
      baseURL: this.API_URL,
    });
    this.service.interceptors.response.use(
      ApiClientService.handleSuccess
      // (error) => {
      //     if (error.response.status === 401) {

      //         if (!error.config.url.includes("login") && typeof window !== 'undefined') {
      //             const authService = new AuthApiService("");
      //             const token = authService.getToken();
      //             this.service
      //                 .get(`/api/auth/refresh?token=${token}`, {})
      //                 .then((res) => {
      //                     // TODO set new token
      //                     setCookie("token", res?.data?.data.jwtToken, { sameSite: "none", secure: true });

      //                 })
      //                 .catch((err) => {
      //                     authService.deleteAllCookies();
      //                     window.location.replace("/signin")
      //                     //window.location.replace("/signin");
      //                 });
      //         }
      //     }
      //     return Promise.reject({
      //         status: error.response && error.response.status,
      //         response: error.response || error,
      //     });
      // }
    );
    this.service.interceptors.request
      .use
      // (config: any) => {
      //     const authService = new AuthApiService("");
      //     const token = authService.getToken();

      //     if (token) {
      //         config.headers[ "Authorization" ] = "Bearer " + token;
      //         //if (!userIsAdmin && agency) config.headers["X-AGENCY"] = agency;
      //     }

      //     config.timeout = this.timeout;
      //     if (!config.url.startsWith("http"))
      //         config.url = "" + this.API_URL.replace(/\/$/, "") + config.url;

      //     return config;
      // },
      // (error) => {
      //     console.error(error);
      // }
      ();
    this.listener = new Subject();
  }

  getService = () => {
    return this.service;
  };

  /**
   * The static method that controls the access to the singleton instance.
   *
   * This implementation let you subclass the Singleton class while keeping
   * just one instance of each subclass around.
   */
  public static getInstance(): ApiClientService {
    if (!ApiClientService.instance) {
      ApiClientService.instance = new ApiClientService();
    }
    return ApiClientService.instance;
  }
}

export default ApiClientService;

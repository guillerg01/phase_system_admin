import { Dispatch, SetStateAction } from "react";

export interface QueryParams {
  pageNo: number;
  pageSize: number;
  search?: string;
  filter?: any;
  brand?: string;
  sortBy?: string;
  sortType?: string;
  isFavorite?: boolean;
  applyTo?: string;
}

export interface ITable {
  data: any[];
  setData: Dispatch<SetStateAction<any[]>>;
  titleTable: string;
  createTitle: string;
  columns: IColumns[];
}

export interface IColumns {
  header: string;
  field: string;
  size?: number;
  ComponentCell?: React.ComponentType<any>;
}

export interface IActions {
  tooltip?: string;
  icon: React.ReactNode;
  handleActions: (e: any) => void;
  title: string;
  hidden?: boolean;
}

export interface IGenericTableProps {
  totalPages: number;
  totalElements: number;
  nextPage: () => void;
  prevPage: () => void;
  setPageNumber: Dispatch<SetStateAction<number>>;
  setSortByData: Dispatch<SetStateAction<string>>;
  setParams: Dispatch<SetStateAction<any>>;
  setLimit: Dispatch<SetStateAction<number>>;
  isError: boolean;
  goToPage: (page: number) => void;
  isLoading: boolean;
  refetch: () => void;
  setSearchData: Dispatch<SetStateAction<string>>;
  isFetching: boolean;
  data: any[];
  columns: IColumns[];
  pageNumber: number;
  countRows: number;
  setSelectItemTable: Dispatch<SetStateAction<any>>;
  actions?: IActions[];
  setCreate?: Dispatch<SetStateAction<boolean>>;
  ComponentFilters?: React.ComponentType;
  HeadTable: React.ComponentType;
  titleTable?: string;
  titleCreate?: string;
  back?: boolean;
}

export interface GenericTableItemProps {
  setSelectItemsTable: Dispatch<SetStateAction<any>>;
  onCheckboxChange: (id: number, checked: boolean) => void;
  isSelected: boolean;
  item: any;
  columns: IColumns[];
  actions?: IActions[];
}

export interface ITableContentProps {
  data: any[];
  // titleTale: string;
  columns: IColumns[];
  totalElements: number;
  setSelectItemsTable: Dispatch<SetStateAction<any>>;
  loading: boolean;
  actions?: IActions[];
  isAdmin?: boolean;
}

export interface Payment {
  id: string;
  transactionDate: string;
  amount: number;
  paymentMethod: "CARD" | "CASH";
  bankName?: string;
  status: "CONFIRMED" | "PENDING" | "FAILED";
  customerName: string;
  customerLastName: string;
  phoneNumber: string;
}

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface ElectricCarChargingTariff {
  id: string;
  pricePerHour: number;
  priceFastCharge: number;
  priceHighConcurrency: number;

  minChargingTime: number;
}

export interface Reservation {
  id: string;
  name: string;
  lastName: string;
  ci: string;
  hoursToUse: number;
  price: number;
  status: "CANCELLED" | "FULFILLED" | "PENDING";
}


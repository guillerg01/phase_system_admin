import { IColumns } from "@/interfaces/interfaces";

export const CACHE_KEYS_TABLE = {
  TABLE_LIST_ALL: "payments-list-all",
};

export const TITLES = {
  TITLE_TABLE: "Drivers",
  TITLE_CREATE: "Add Driver",
};

export const countRows = 10;

export const constParams: IColumns[] = [
  {
    field: "transactionDate",
    header: "Date & Time",
    size: 300,
  },
  {
    field: "amount",
    header: "Amount",
    size: 300,
  },
  {
    field: "customerName",
    header: "Customer Name",
    size: 300,
  },
  {
    field: "phoneNumber",
    header: "Phone",
    size: 300,
  },
  {
    field: "paymentMethod",
    header: "Payment Method",
    size: 300,

  },
  {
    field: "status",
    header: "Status",
    size: 300,
  },
];

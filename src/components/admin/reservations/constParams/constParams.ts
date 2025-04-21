import { IColumns } from "@/interfaces/interfaces";

export const CACHE_KEYS_TABLE = {
  TABLE_LIST_ALL: "Reservations",
  TABLE_ONE_ITEM: "Reservation",
};

export const TITLES = {
  TITLE_TABLE: "Reservations",
  TITLE_CREATE: "Add Reservation",
};

export const countRows = 10;

export const constParams: IColumns[] = [
  {
    field: `name`,
    header: "Reservation Name",
    size: 300,
  },
  {
    field: `lastName`,
    header: "Last Name",
    size: 600,
  },
  {
    field: "phone",
    header: "Phone",
  },
  {
    field: "status",
    header: "Status",
  },
  {
    field: "price",
    header: "Price",
  },
  {
    field: "hoursToUse",
    header: "Hours to Use",
  },
];

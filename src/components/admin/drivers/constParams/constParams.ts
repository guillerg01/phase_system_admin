import { IColumns } from "@/interfaces/interfaces";

export const CACHE_KEYS_TABLE = {
  TABLE_LIST_ALL: "Drivers",
  TABLE_ONE_ITEM: "Driver",
};

export const TITLES = {
  TITLE_TABLE: "Drivers",
  TITLE_CREATE: "Add Driver",
};

export const countRows = 10;

export const constParams: IColumns[] = [
  {
    field: `name`,
    header: "Driver Name",
    size: 300,
  },
  {
    field: `email`,
    header: "Email",
    size: 600,
  },
  {
    field: "phone",
    header: "Phone",
  },
];

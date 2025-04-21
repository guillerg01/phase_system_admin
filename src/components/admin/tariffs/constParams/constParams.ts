import { IColumns } from "@/interfaces/interfaces";

export const CACHE_KEYS_TABLE = {
  TABLE_LIST_ALL: "tariffs-list-all",
};

export const TITLES = {
  TITLE_TABLE: "Tariffs",
  TITLE_CREATE: "Add Tariff",
};

export const countRows = 10;

export const constParams: IColumns[] = [
  {
    field: "pricePerHour",
    header: "Price Per Hour",
    size: 200,
  },
  {
    field: "priceFastCharge",
    header: "Fast Charge Price",
    size: 200,
  },
  {
    field: "priceHighConcurrency",
    header: "High Concurrency Price",
    size: 200,
  },
  {
    field: "minChargingTime",
    header: "Min Charging Time",
    size: 200,
  },
];

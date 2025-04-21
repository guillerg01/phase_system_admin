"use client";

import GenericTableItem from "./GenericTableItem";

import { IColumns, ITableContentProps } from "@/interfaces/interfaces";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { useItemSelection } from "@/utils/use-item-selection";
import { usePathname } from "next/navigation";

export default function GenericTable({
  data,
  columns,
  ...props
}: ITableContentProps) {
  const pathname = usePathname();
  const {
    selectedItems,
    isAllSelected,
    handleCheckboxChange,
    handleSelectAllChange,
  } = useItemSelection(data);

  return (
    <div className={`bg-trasnparent text-white    relative`}>
      {/* {!pathname.includes("/settings/") && (
        <header className="px-5 py-4">
          <h2 className="font-semibold text-slate-800 dark:text-slate-100">
            {props.titleTale + " List"}{" "}
            <span className="text-slate-400 dark:text-slate-500 font-medium">
              {props.totalElements}
            </span>
          </h2>
        </header>
      )} */}
      <div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full  formTable">
            {/* Table header */}
            <thead className="text-xs font-semibold   border-b-[3px] border-pinkTable dark:border-slate-700">
              <tr>
                {columns.map((column: IColumns) => (
                  <th
                    key={column.header}
                    style={{ width: column.size ? column.size + "px" : "auto" }}
                    className={`px-2  first:pl-0 last:pr-5 py-3 whitespace-nowrap`}
                  >
                    <div className="font-bold text-xs text-left">
                      {column.header}
                    </div>
                  </th>
                ))}

                {columns.length !== 0 && props.actions && props.actions.length !== 0 && (
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-semibold  text-center mx-auto">
                      Actions
                    </div>
                  </th>
                )}
              </tr>
            </thead>

            {/* Table body */}
            <tbody className="text-sm divide-y-[3px] divide-pinkTable dark:divide-slate-700 divide-solid">
              {!props.loading &&
                data?.map((item, i: number) => (
                  <GenericTableItem
                    key={item.id ?? i}
                    item={item}
                    onCheckboxChange={handleCheckboxChange}
                    isSelected={selectedItems.includes(item.id)}
                    setSelectItemsTable={props.setSelectItemsTable}
                    columns={columns}
                    actions={props.actions}
                  />
                ))}
            </tbody>
          </table>
          {props.loading && (
            <div className={"flex justify-center items-center my-40"}>
              <LoadingSpinner size={"6em"} />
            </div>
          )}

          {!props.loading && data?.length === 0 && (
            <div className={"flex flex-col justify-center items-center my-40 "}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
              >
                <g clipPath="url(#clip0_681_16970)">
                  <path
                    d="M166.667 49.9999H100L83.3333 33.3333H59.75L93.0833 66.6666H166.667V143.083L181.333 157.75C182.583 155.417 183.333 152.833 183.333 150V66.6666C183.333 57.4999 175.833 49.9999 166.667 49.9999Z"
                    fill="#94A3B8"
                  />
                  <path
                    d="M17.5 17.5L5.75 29.25L18.75 42.25C17.5 44.5833 16.75 47.1667 16.75 50L16.6667 150C16.6667 159.167 24.1667 166.667 33.3333 166.667H143.083L170.667 194.25L182.417 182.5L17.5 17.5ZM33.3333 150V56.9167L126.417 150H33.3333Z"
                    fill="#94A3B8"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_681_16970">
                    <rect width="200" height="200" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <h2 className={"text-[60px] uppercase font-medium "}>No data</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { Dispatch, SetStateAction } from "react";

import { usePathname, useRouter } from "next/navigation";
import SearchForm from "../search-form/search-form";


interface IProps {
  titlePage: string;
  titleCreate?: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchPlaceHolder: string;
  setCreate: Dispatch<SetStateAction<boolean>>;
  Filters?: React.ComponentType;
  back?: boolean;
  totalElements?: number;
  isAdmin?: boolean;
}

const PageHeader = ({ Filters, ...props }: IProps) => {
  const FiltersComponent = Filters ? <Filters /> : null;
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-5">
      {/* Left: Title */}
      <div className="flex gap-4 mb-4 sm:mb-0">
        {props.back && (
          <button
            onClick={() => router.back()}
            className={
              "flex gap-2 items-center border bg-white dark:bg-backToList rounded-[4px] px-4 py-2 mb-4 w-[116px] h-[30px]"
            }>
            {" "}
            <span
              className={
                "text-[#475569] font-medium text-[14px] dark:text-white"
              }>
              Back to list
            </span>
          </button>
        )}
        <h1 className="text-2xl md:text-3xl text-slate-800 dark:text-slate-100 font-bold">
          {props.titlePage +
            (props.isAdmin && pathname.includes("/settings/") ? " List" : "")}
          {props.isAdmin && pathname.includes("/settings/") && (
            <span className={"text-slate-400 dark:text-slate-500 font-medium"}>
              {" " + (props?.totalElements ?? "")}
            </span>
          )}
        </h1>
      </div>

      {/* Right: Actions */}
      <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
        {/* Search form */}
        <SearchForm
          placeholder={props.searchPlaceHolder}
          setSearch={props.setSearch}
        />
        {FiltersComponent}
        {/* Create invoice button */}
        {props.titleCreate && (
          <button
            className="btn bg-[#0EA5E9] hover:bg-bgHover text-white"
            onClick={() => props.setCreate(true)}>
            <svg
              className="w-4 h-4 fill-current opacity-50 shrink-0"
              viewBox="0 0 16 16">
              <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
            </svg>
            <span className="hidden md:block ml-2"> {props.titleCreate}</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;

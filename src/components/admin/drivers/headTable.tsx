"use cliente";

import { AddButton } from "@/components/Buttons/buttons";
import SearchForm from "@/components/search-form/search-form";
import React, { Dispatch, SetStateAction } from "react";
interface IProps {
  setSearch: Dispatch<SetStateAction<string>>;
  setParams: Dispatch<SetStateAction<any>>;
  totalElements: number;

  setCreate: () => void;
  hiddenCreate?: boolean;
}
const HeadTable = ({ hiddenCreate = false, ...props }: IProps) => {
  return (
    <div className=" flex flex-col pb-10 gap-10">
      <h2 className="text-[29px] font-bold text-white">Drivers</h2>
      <div className="flex gap-2 items-center">
        <div className="w-full">
          <SearchForm
            placeholder={"Search by name"}
            setSearch={props.setSearch}
          />
        </div>
        {!hiddenCreate && (
          <AddButton
            onClick={props.setCreate}
            className=" inset-0 right-auto group left-4"
          />
        )}
      </div>
    </div>
  );
};

export default HeadTable;

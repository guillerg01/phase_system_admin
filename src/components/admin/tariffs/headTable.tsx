"use client";

import { AddButton } from "@/components/Buttons/buttons";
import SearchForm from "@/components/search-form/search-form";

import { Dispatch, SetStateAction } from "react";

interface IProps {
  setParams: Dispatch<any>;
  setSearch: Dispatch<SetStateAction<string>>;
  totalElements: any;
  setCreate: () => void;
  hiddenCreate: boolean;
}

const HeadTable = ({ setCreate, setSearch, hiddenCreate }: IProps) => {
  return (
    <div className="sm:flex sm:justify-between sm:items-center mb-5">
      <div className="mb-4 sm:mb-0">
        <h1 className="text-2xl md:text-3xl text-white font-bold">Tariffs</h1>
      </div>
      <div className="flex gap-2 items-center">
        <SearchForm placeholder={"Search tariff"} setSearch={setSearch} />
        {!hiddenCreate && (
          <AddButton
            onClick={setCreate}
            className="inset-0 right-auto group left-4"
          />
        )}
      </div>
    </div>
  );
};

export default HeadTable;

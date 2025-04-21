"use client";

import { ExportButton } from "@/components/Buttons/buttons";
import SearchForm from "@/components/search-form/search-form";
import PaymentApiServices from "@/services/PaymentApiServices";
import { Dispatch, SetStateAction } from "react";
import * as XLSX from "xlsx";

interface IProps {
  setParams: Dispatch<any>;
  setSearch: Dispatch<SetStateAction<string>>;
  totalElements: any;
  handleExport: () => void;
}

const HeadTable = ({ setSearch,handleExport }: IProps) => {
 
  return (
    <div className="sm:flex sm:justify-between sm:items-center mb-5">
      <div className="mb-4 sm:mb-0">
        <h1 className="text-2xl md:text-3xl text-white font-bold">Payments</h1>
      </div>
      <div className="flex gap-2 items-center">
        <SearchForm placeholder={"Search by name"} setSearch={setSearch} />
        <ExportButton
          onClick={()=>handleExport()}
          className="bg-blue-500 !h-10 text-white px-4 py-2 rounded-md"
        />
      </div>
    </div>
  );
};

export default HeadTable;

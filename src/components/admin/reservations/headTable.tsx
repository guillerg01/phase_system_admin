"use cliente";

import { AddButton } from "@/components/Buttons/buttons";
import SearchForm from "@/components/search-form/search-form";
import { Listbox } from "@headlessui/react";
import React, { Dispatch, SetStateAction, useState } from "react";

const filterOptions = [
  { value: "today", text: "Today" },
  { value: "previous", text: "Previous" },
];

interface IProps {
  setSearch: Dispatch<SetStateAction<string>>;
  setParams: Dispatch<SetStateAction<any>>;
  totalElements: number;

  setCreate?: () => void;
  hiddenCreate?: boolean;
}

const HeadTable = ({ hiddenCreate = false, ...props }: IProps) => {
  const [selected, setSelected] = useState(filterOptions[0]);

  const handleChange = (option: (typeof filterOptions)[0]) => {
    setSelected(option);
    if (props.setParams) {
      props.setParams({ ...props.setParams, filter: option.value });
    }
  };

  return (
    <div className=" flex flex-col pb-10 gap-10">
      <h2 className="text-[29px] font-bold text-white">Reservations</h2>
      <div className="flex gap-5 items-center">
      
          <SearchForm
            placeholder={"Search by name"}
            setSearch={props.setSearch}
          />
     
        <div className="w-full relative">
          <Listbox value={selected} onChange={handleChange}>
            <Listbox.Button className="w-full bg-[#00000050] text-white p-2 rounded-md text-left">
              {selected.text}
            </Listbox.Button>
            <Listbox.Options className="absolute w-full mt-1 bg-[#00000050] backdrop-blur-sm  z-20 rounded-md py-1">
              {filterOptions.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option}
                  className={({ active }) =>
                    `px-2 py-1 cursor-pointer ${
                      active ? "bg-[#00000060]" : ""
                    } text-white`
                  }
                >
                  {option.text}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Listbox>
        </div>
        {!hiddenCreate && (
          <AddButton
            onClick={props.setCreate}
            className="inset-0 min-w-32 right-auto group left-4"
          />
        )}
      </div>
    </div>
  );
};

export default HeadTable;

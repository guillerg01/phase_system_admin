"use client";
import * as React from "react";

interface EmailInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

//self-start mt-9 ml-4 max-md:ml-2.5
//self-end px-4 py-5 mt-7  text-sm leading-none text-black rounded-3xl border-2 border-solid bg-indigo-50 bg-opacity-80 border-neutral-700  max-md:pr-5
const EmailInput = ({ value, onChange }:EmailInputProps) => {
  return (
    <div className=" mt-5 mb-2" >
      <label className=" text-white"> Correo electrónico</label>
      <input type="email" value={value}
        onChange={onChange}
        placeholder="Ingresa tu correo electrónico"
        className="w-[462px] h-[25px] max-w-full mt-1 border-2 border-solid bg-indigo-50 bg-opacity-80  rounded-3xl  px-4 py-5 text-black border-2 border-solid  border-neutral-700  text-sm leading-none "
      />
    </div>
  );
};

export default EmailInput;

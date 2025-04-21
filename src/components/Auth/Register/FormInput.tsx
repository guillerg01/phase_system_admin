import React from "react";

interface FormInputProps {
  label: string;
  placeholder: string;
  type: string;
  name: string;
}

export const FormInput = ({
  label,
  placeholder,
  type,
  name,
}:FormInputProps) => {
  return (
    <div>
      <label htmlFor={name}> {label} </label>
      <input id={name} type={type} name={name} placeholder={placeholder}
        className={`
          h-[25px]
          px-4 py-5 mt-2 mb-6 text-sm leading-none text-black rounded-3xl border-2 border-solid
          bg-indigo-50 bg-opacity-80 border-neutral-700
           w-full
        `}
      />
    </div>
  );
};

export default FormInput;
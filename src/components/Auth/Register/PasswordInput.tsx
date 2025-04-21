"use client";

import React, { useState } from "react";

interface PasswordInputProps {
  label: string;
  placeholder: string;
  name: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  label,
  placeholder,
  name,
 }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <label htmlFor={name} className=""> {label} </label>
      <div>
        <input
          type={showPassword ? "text" : "password"}
          id={name}
          name={name}
          placeholder={placeholder}
          className={`
            h-[25px]
            px-4 py-5 mt-2 mb-6 pr-[40px] text-sm leading-none text-black rounded-3xl border-2 border-solid
            bg-indigo-50 bg-opacity-80 border-neutral-700
             w-full
          `}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className=" relative top-[-55px] left-[90%]"
        >
          <img
            src="/ojo.svg"
            alt={showPassword ? "Hide password" : "Show password"}
            className="object-contain shrink-0 aspect-[1.28] w-[23px]"
          />
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;

"use client";
import * as React from "react";

interface PasswordInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({ value, onChange }: PasswordInputProps) => {
  return (
    <div className="mt-5 mb-6 ">
      <label className="text-white">Contraseña</label>
      <input
        type="password"
        value={value}
        onChange={onChange}
        placeholder="Ingresa tu contraseña"
        className="w-[462px] h-[25px] max-w-full mt-1 border-2 border-solid bg-indigo-50 bg-opacity-80  rounded-3xl  px-4 py-5 text-black border-2 border-solid  border-neutral-700  text-sm leading-none"
        aria-label="Password input"
      />
    </div>
  );
};

export default PasswordInput;

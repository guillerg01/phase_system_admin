// src/app/register/RegistrationForm.tsx

"use client";

import React, { useState } from "react";
import FormInput from "./FormInput";
import PasswordInput from "./PasswordInput";
import { CreateAccountButton, GREEN_COLOR_BUTTON, RED_COLOR_BUTTON } from "../../Buttons/buttons";
import { useAuth } from "@/context/AuthContext";

const COVER_IMAGE = `bg-[url('/Register.svg')] bg-cover`;

const RegistrationForm = () => {

  const { closeRegister } = useAuth();

  return (
    <div className="w-[1285px] h-[704px] flex flex-row  bg-[#00000066] rounded-[70px] shadow-lg w-full max-w-4xl">
      <Cover />
      <Information />
    </div>

  );

  function Information() {
    return (
    <div className="w-1/2 flex flex-col justify-center rounded-tr-[70px] rounded-br-[70px] bg-[#00000066]">
      <form 
        className="flex flex-col px-8  w-full font-medium text-base   text-white "
       >
        <h1 className="self-center  mt-4 mb-2 text-[30px] font-bold "> Registro </h1>

        <FormInput
          label="Nombre y apellidos"
          placeholder="Escribe tu nombre completo"
          type="text"
          name="fullName"
        />

        <FormInput
          label="Correo electrónico"
          placeholder="Ingresa tu correo electrónico"
          type="email"
          name="email"
        />

        <FormInput
          label="Teléfono"
          placeholder="Ingresa tu telefono"
          type="tel"
          name="phone"
        />

        <PasswordInput
          label="Contraseña"
          placeholder="Ingresa tu contraseña"
          name="password"
        />

        <PasswordInput
          label="Confirmar contraseña"
          placeholder="Ingresa tu contraseña nuevamente"
          name="confirmPassword"
          />

        <CreateAccountButton/>

       </form>
    </div>
    );
  }

 


  function Cover() {
    return <div className={`w-1/2  relative ${COVER_IMAGE} bg-[#00000066] rounded-tl-[70px] rounded-bl-[70px] `}>
      <CloseLoginButton  />
    </div>;
  }

  function CloseLoginButton() {
    return <button onClick={closeRegister} className={` w-[35px] h-[35px] ${GREEN_COLOR_BUTTON} hover:${RED_COLOR_BUTTON} 
                                                 relative  top-[20px] right-[-5%]  rounded-full text-white shadow-lg border border-gray-200 `}>
      ✕
    </button>;
  }
};



export default RegistrationForm;


{/* <div className="text-center  text-white">
<span className="text-xl">¿Ya tiene una cuenta?</span>{" "}
<span className="font-bold text-2xl">Inicie sesión</span>
</div> */}